'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RepoService, type CreateRepositoryRequest } from '@/services/repos';
import type { Repository } from '@/types';

export const useRepos = useRepositories;

export function useRepositories(projectId: string | undefined) {
  return useQuery<Repository[]>({
    queryKey: ['repositories', projectId],
    queryFn: () => RepoService.list(projectId!),
    enabled: !!projectId,
  });
}

export function useRepository(id: string | undefined) {
  return useQuery<Repository>({
    queryKey: ['repository', id],
    queryFn: () => RepoService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateRepository() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: CreateRepositoryRequest }) =>
      RepoService.create(projectId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['repositories', variables.projectId] });
    },
  });
}

export function useSyncRepository() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => RepoService.sync(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['repository', id] });
    },
  });
}

export function useDeleteRepository() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => RepoService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repositories'] });
    },
  });
}

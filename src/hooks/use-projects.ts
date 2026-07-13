'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ProjectService,
  type CreateProjectRequest,
  type UpdateProjectRequest,
} from '@/services/projects';
import type { Project } from '@/types';

export function useProjects(orgId: string | undefined) {
  return useQuery<Project[]>({
    queryKey: ['projects', orgId],
    queryFn: () => ProjectService.list(orgId!),
    enabled: !!orgId,
  });
}

export function useProject(id: string | undefined) {
  return useQuery<Project>({
    queryKey: ['project', id],
    queryFn: () => ProjectService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orgId, data }: { orgId: string; data: CreateProjectRequest }) =>
      ProjectService.create(orgId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects', variables.orgId] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectRequest }) =>
      ProjectService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProjectService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DeploymentService, type CreateDeploymentRequest } from '@/services/deployments';
import type { Deployment } from '@/types';

export function useDeployments(projectId: string | undefined) {
  return useQuery<Deployment[]>({
    queryKey: ['deployments', projectId],
    queryFn: () => DeploymentService.list(projectId!),
    enabled: !!projectId,
  });
}

export function useDeployment(id: string | undefined) {
  return useQuery<Deployment>({
    queryKey: ['deployment', id],
    queryFn: () => DeploymentService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateDeployment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: CreateDeploymentRequest }) =>
      DeploymentService.create(projectId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['deployments', variables.projectId] });
    },
  });
}

export function useRollbackDeployment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DeploymentService.rollback(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['deployment', id] });
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
  });
}

export function useCancelDeployment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DeploymentService.cancel(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['deployment', id] });
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
  });
}

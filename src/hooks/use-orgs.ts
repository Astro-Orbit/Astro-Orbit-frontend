'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrgService, type CreateOrgRequest } from '@/services/orgs';
import type { Organization } from '@/types';

export function useOrganizations() {
  return useQuery<Organization[]>({
    queryKey: ['organizations'],
    queryFn: () => OrgService.list(),
  });
}

export function useOrganization(id: string | undefined) {
  return useQuery<Organization>({
    queryKey: ['organization', id],
    queryFn: () => OrgService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrgRequest) => OrgService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
}

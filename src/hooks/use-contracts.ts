'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ContractService,
  type CreateContractRequest,
  type CreateVersionRequest,
} from '@/services/contracts';
import type { Contract } from '@/types';

export function useContracts(projectId: string | undefined) {
  return useQuery<Contract[]>({
    queryKey: ['contracts', projectId],
    queryFn: () => ContractService.list(projectId!),
    enabled: !!projectId,
  });
}

export function useContract(id: string | undefined) {
  return useQuery<Contract>({
    queryKey: ['contract', id],
    queryFn: () => ContractService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: CreateContractRequest }) =>
      ContractService.create(projectId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contracts', variables.projectId] });
    },
  });
}

export function useContractVersions(contractId: string | undefined) {
  return useQuery({
    queryKey: ['contract-versions', contractId],
    queryFn: () => ContractService.listVersions(contractId!),
    enabled: !!contractId,
  });
}

export function useCreateContractVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contractId, data }: { contractId: string; data: CreateVersionRequest }) =>
      ContractService.createVersion(contractId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contract-versions', variables.contractId] });
    },
  });
}

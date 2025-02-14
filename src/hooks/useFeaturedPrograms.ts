import { useQuery } from '@tanstack/react-query';
import api from '@/api/config';
import { API_ENDPOINTS } from '@/api/end-points';
import { Program } from '@/types/program';

interface ProgramsResponse {
  results: Program[];
  count: number;
}

export function useFeaturedPrograms() {
  return useQuery<ProgramsResponse>({
    queryKey: ['featured-programs'],
    queryFn: async () => {
      const response = await api.get<ProgramsResponse>(API_ENDPOINTS.COURSE.BASE, {
        params: {
          limit: 8,
          offset: 0,
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
} 
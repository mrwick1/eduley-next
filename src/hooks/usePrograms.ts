import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/api/config';
import { API_ENDPOINTS } from '@/api/end-points';
import { Program } from '@/types/program';

interface ProgramsResponse {
  results: Program[];
  count: number;
}

export function usePrograms(initialData?: ProgramsResponse) {
  return useInfiniteQuery({
    queryKey: ['programs'],
    initialPageParam: 0,
    initialData: initialData ? {
      pages: [initialData],
      pageParams: [0],
    } : undefined,
    queryFn: async ({ pageParam = 0 }) => {
      const response = await api.get(API_ENDPOINTS.COURSE.BASE, {
        params: {
          limit: 12,
          offset: pageParam,
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const offset = allPages.length * 12;
      return lastPage.results.length === 12 ? offset : undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
} 
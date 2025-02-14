import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import api from '@/api/config';
import { API_ENDPOINTS } from '@/api/end-points';
import { Program } from '@/app/page';

const ITEMS_PER_PAGE = 12;

interface ProgramsResponse {
  results: Program[];
  count: number;
}

export function usePrograms() {
  return useInfiniteQuery<ProgramsResponse>({
    queryKey: ['programs'],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const response = await api.get<ProgramsResponse>(API_ENDPOINTS.COURSE.BASE, {
        params: {
          limit: ITEMS_PER_PAGE,
          offset: pageParam,
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage: ProgramsResponse, allPages) => {
      const offset = allPages.length * ITEMS_PER_PAGE;
      return lastPage.results.length === ITEMS_PER_PAGE ? offset : undefined;
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000,   // Keep unused data in cache for 10 minutes
    suspense: true, // Enable suspense mode
  });
} 
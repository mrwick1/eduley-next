import { useInfiniteQuery } from '@tanstack/react-query';
import { Program } from '@/types/program';
import api from '@/api/config';
import { API_ENDPOINTS } from '@/api/end-points';

interface ProgramsResponse {
  results: Program[];
  count: number;
}

interface UseProductsOptions {
  initialData?: ProgramsResponse;
  search?: string;
}

export function usePrograms({ initialData, search }: UseProductsOptions = {}) {
  return useInfiniteQuery({
    queryKey: ['programs', search],
    initialPageParam: 1,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await api.get(API_ENDPOINTS.COURSE.BASE, {
        params: {
          limit: 12,
          offset: (pageParam - 1) * 12,
          ...(search ? { search } : {}),
        },
      });
      return response.data;
    },
    initialData: search ? undefined : initialData ? {
      pages: [initialData],
      pageParams: [1],
    } : undefined,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.count / 12);
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });
} 
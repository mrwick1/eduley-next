import { useInfiniteQuery } from '@tanstack/react-query';
import { Program } from '@/types/program';
import api from '@/api/config';
import { API_ENDPOINTS } from '@/api/end-points';
import { getAllPrograms } from '@/lib/programs';

interface ProgramsResponse {
  results: Program[];
  count: number;
}

interface UseProgramsOptions {
  initialData?: {
    results: Program[];
    count: number;
  };
  search?: string;
}

export function usePrograms({ initialData, search }: UseProgramsOptions) {
  return useInfiniteQuery({
    queryKey: ['programs', search],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getAllPrograms(pageParam, search),
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.reduce((total, page) => total + page.data.length, 0);
      return loadedItems < lastPage.total ? allPages.length + 1 : undefined;
    },
    initialData: initialData ? {
      pages: [{
        data: initialData.results,
        total: initialData.count,
        hasMore: initialData.count > 12
      }],
      pageParams: [1],
    } : undefined,
  });
} 
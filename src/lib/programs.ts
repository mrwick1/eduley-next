import api from "@/api/config";
import { API_ENDPOINTS } from "@/api/end-points";
import { Program } from "@/types/program";



export async function getProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const response = await api.get(`/course/${slug}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching program details:', error);
    return null;
  }
}

export async function getAllPrograms(page: number, search?: string, limit?: number) {
  const pageLimit = limit || 12;
  const response = await api.get(API_ENDPOINTS.COURSE.BASE, {
    params: {
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
      ...(search ? { search } : {})
    }
  });
  return {
    data: response.data.results,
    total: response.data.count,
    hasMore: response.data.count > page * pageLimit
  };
}

export async function getAllProgramSlugs(): Promise<{ slug: string }[]> {
  const programs = await getAllPrograms(1, undefined, 300);
  return programs.data.map((program: Program) => ({
    slug: program.slug,
  }));
}

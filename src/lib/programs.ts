import api from "@/api/config";
import { API_ENDPOINTS } from "@/api/end-points";
import { Program } from "@/types/program";

export async function getProgramSlugs(): Promise<string[]> {
  try {
    // Assuming you have an endpoint that returns all courses
    const response = await api.get('/courses/');
    const programs: Program[] = response.data;
    
    // Extract slugs from the programs
    return programs.map(program => program.slug);
  } catch (error) {
    console.error('Error fetching program slugs:', error);
    return [];
  }
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const response = await api.get(`/course/${slug}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching program details:', error);
    return null;
  }
}

export async function getAllPrograms(page: number = 1, limit: number = 16): Promise<{
  data: Program[];
  hasMore: boolean;
  total: number;
}> {
  try {
    const response = await api.get(`${API_ENDPOINTS.COURSE.BASE}?limit=${limit}&offset=${(page - 1) * limit}`);
    return {
      data: response.data?.results || [],
      hasMore: response.data?.next !== null,
      total: response.data?.count || 0
    };
  } catch (error) {
    console.error('Error fetching programs:', error);
    return {
      data: [],
      hasMore: false,
      total: 0
    };
  }
}

export async function getAllProgramSlugs(): Promise<{ slug: string }[]> {
  const programs = await getAllPrograms(1, 300,);
  return programs.data.map((program: Program) => ({
    slug: program.slug,
  }));
} 
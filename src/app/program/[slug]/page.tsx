import { Metadata } from "next";
import { notFound } from "next/navigation";
import api from "@/api/config";
import CourseDetails from "@/components/Program/CourseDetails";
import { Program } from "@/types/program";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const program = await getProgramDetails(resolvedParams.slug);
    return {
      title: program.name,
      description: program.short_description,
      openGraph: {
        title: program.name,
        description: program.short_description,
        images: [program.poster_image.media_file || ''],
      },
    };
  } catch (error) {
    return {
      title: 'Program Details',
      description: 'Program not found',
    };
  }
}

async function getProgramDetails(slug: string): Promise<Program> {
  try {
    const response = await api.get(`/course/${slug}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching program details:', error);
    notFound();
  }
}

export default async function ProgramPage({ params }: Props) {
  const resolvedParams = await params;
  const program = await getProgramDetails(resolvedParams.slug);
  
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <CourseDetails program={program} />
    </main>
  );
} 
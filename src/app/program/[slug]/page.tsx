import { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetails from "@/components/Program/CourseDetails";
import { getProgramBySlug, getAllProgramSlugs } from "@/lib/programs";

// Type for the params
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for each program page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Await the params
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  
  if (!program) {
    return {
      title: 'Program Not Found | Eduley',
      description: 'The requested program could not be found.',
    };
  }

  return {
    title: `${program.name} | Eduley`,
    description: program.short_description || 'Learn more about this educational program',
    openGraph: {
      title: program.name,
      description: program.short_description,
      images: [program.poster_image?.media_file || program.poster_image?.url || ''],
    },
  };
}

// Generate static paths for all programs
export async function generateStaticParams() {
  const paths = await getAllProgramSlugs();
  console.log('Paths received:', paths);
  
  // Ensure paths is an array
  if (!Array.isArray(paths)) {
    console.error('Expected array of paths, received:', typeof paths);
    return [];
  }

  return paths.map((path: { slug: string }) => ({
    slug: path.slug,
  }));
}

export default async function ProgramPage({ params }: PageProps) {
  // Await the params
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  
  if (!program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <CourseDetails program={program} />
    </main>
  );
}

// Revalidation settings
export const revalidate = 3600;
export const dynamicParams = true;
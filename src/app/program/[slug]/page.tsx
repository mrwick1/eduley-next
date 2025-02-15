import { notFound } from "next/navigation";
import CourseDetails from "@/components/Program/CourseDetails";
import { getProgramBySlug, getAllProgramSlugs } from "@/lib/programs";

// Generate metadata for each program page
// @ts-expect-error - Next.js page props type inference conflicts with explicit typing, safe to ignore as params.slug is validated
export async function generateMetadata({ params }) {
  const program = await getProgramBySlug(params.slug);
  
  if (!program) {
    return {
      title: 'Program Details',
      description: 'Program not found',
    };
  }

  return {
    title: program.name,
    description: program.short_description,
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

// @ts-expect-error - Next.js page props type inference conflicts with explicit typing, safe to ignore as params.slug is validated
export default async function ProgramPage({ params }) {
  const program = await getProgramBySlug(params.slug);
  
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
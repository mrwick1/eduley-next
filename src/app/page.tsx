import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import FeaturedPrograms from "@/components/Home/FeaturedPrograms";
import api from "@/api/config";
import { API_ENDPOINTS } from "@/api/end-points";
import { getInstituteConfig } from "@/api/config";
import { Program } from "@/types/program";

// Force static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Generate static metadata
export async function generateMetadata(): Promise<Metadata> {
  const config = await getInstituteConfig();
  return {
    title: `${config?.name || 'Eduley'} - Home`,
    description: config?.tagline || 'Empowering dreams through education',
    openGraph: {
      title: config?.name,
      description: config?.tagline,
      images: [config?.logo],
    },
  };
}

// Generate static data at build time
export async function generateStaticParams() {
  return [];
}

// Fetch data at build time
async function getFeaturedPrograms(): Promise<Program[]> {
  try {
    const response = await api.get(API_ENDPOINTS.COURSE.BASE, {
      params: {
        limit: 8,
        offset: 0,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching featured programs:', error);
    return [];
  }
}

// Static page component
export default async function Home() {
  // Get data at build time
  const programs = await getFeaturedPrograms();

  return (
    <main>
      <Hero />
      <FeaturedPrograms initialPrograms={programs} />
    </main>
  );
}
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import FeaturedPrograms from "@/components/Home/FeaturedPrograms";
import api from "@/api/config";
import { API_ENDPOINTS } from "@/api/end-points";
import { getInstituteConfig } from "@/api/config";

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

async function getLandingPageData() {
  try {
    const response = await api.get(API_ENDPOINTS.LANDING_PAGE);
    return {
      banner_images: response.data.banner_images || [],
      top_courses: response.data.top_courses || [],
      description: response.data.description || '',
      video_title: response.data.video_title || '',
      video: response.data.video || '',
    };
  } catch (error) {
    console.error('Error fetching landing page data:', error);
    return { 
      banner_images: [],
      top_courses: [],
      description: '',
      video_title: '',
      video: '',
    };
  }
}

// Static page component
export default async function Home() {
  const landingData = await getLandingPageData();

  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen">
      <Hero initialBanners={landingData.banner_images} />
      <FeaturedPrograms initialPrograms={landingData.top_courses} />
    </main>
  );
}
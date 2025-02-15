import Image from "next/image";
import { Play } from "lucide-react";
import { Program } from "@/types/program";

interface CourseHeaderProps {
  program: Program;
}

export default function CourseHeader({ program }: CourseHeaderProps) {
  return (
    <div className="relative bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-[1536px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Course Tags */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm font-medium">
                  {program.course_level}
                </span>
                {program.category && (
                  <span className="px-4 py-1.5 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded-full text-sm">
                    {program.category.name}
                  </span>
                )}
              </div>

              {/* Title and Description */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  {program.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {program.short_description}
                </p>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Duration</p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {program.duration_in_weeks} weeks
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Lessons</p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {program.total_content_type.total_lessons}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Quizzes</p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {program.total_content_type.total_quizes}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Assignments</p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {program.total_content_type.total_assignments}
                  </p>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-4">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {program.is_course_free ? (
                    "Free"
                  ) : (
                    <>
                      {program.price_currency.prefix} {program.price}
                    </>
                  )}
                </div>
                <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all">
                  Enroll Now
                </button>
              </div>
            </div>

            {/* Right Content - Course Preview */}
            <div className="relative">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800 shadow-md">
                <div className="relative w-full h-full">
                  <Image
                    src={program.poster_image.media_file || ''}
                    alt={program.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {program.intro_video_media && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer group">
                      {/* Play button */}
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/95 group-hover:bg-white transition-all group-hover:scale-105 shadow-lg">
                        <Play className="w-6 h-6 text-blue-600 fill-blue-600" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Info Card */}
              <div className="mt-6 flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
                    <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Course Preview</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{program.duration_in_weeks} weeks • {program.total_content_type.total_lessons} lessons</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
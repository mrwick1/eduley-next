import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Reviewer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_photo: string | null;
  groups: number[];
}

interface CourseReviewsProps {
  reviewers: Reviewer[];
}

export default function CourseReviews({ reviewers }: CourseReviewsProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Course Reviewers</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {reviewers.length} {reviewers.length === 1 ? 'reviewer' : 'reviewers'} assigned to this course
        </p>
      </div>

      {reviewers.length > 0 ? (
        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviewers.map((reviewer) => (
              <div
                key={reviewer.id}
                className="group flex items-center gap-4 p-4 rounded-lg border border-gray-100 dark:border-gray-800 
                         hover:border-gray-200 dark:hover:border-gray-700 
                         bg-gray-50/50 dark:bg-gray-800/50 
                         transition-all duration-200"
              >
                <div className="relative">
                  <Avatar className="h-14 w-14 border-2 border-white dark:border-gray-700 shadow-sm">
                    <AvatarImage 
                      src={reviewer.profile_photo || undefined} 
                      alt={`${reviewer.first_name} ${reviewer.last_name}`} 
                    />
                    <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                      {`${reviewer.first_name[0]}${reviewer.last_name[0]}`}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 
                               group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-200 -z-10" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {reviewer.first_name} {reviewer.last_name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      reviewer.groups.includes(5) 
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                        : 'bg-purple-50 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                    }`}>
                      {reviewer.groups.includes(5) ? 'Reviewer' : 'Instructor'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {reviewer.email}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 
                       flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
            No reviewers assigned
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            There are currently no reviewers assigned to this course.
          </p>
        </div>
      )}
    </div>
  );
} 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Program } from "@/types/program";
import { motion } from "framer-motion";

interface CourseInstructorProps {
  instructor: Program['instructor'];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CourseInstructor({ instructor }: CourseInstructorProps) {
  if (!instructor.iap_user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
        <p className="text-gray-500 dark:text-gray-400 text-center">No instructor information available</p>
      </div>
    );
  }

  const initials = `${instructor.iap_user.first_name[0]}${instructor.iap_user.last_name[0]}`;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show" 
    >
      <motion.div 
        variants={item}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-8"
      >
        <div className="flex flex-col sm:flex-row gap-8">
          <Avatar className="w-32 h-32 rounded-xl ">
            <AvatarImage 
              src={instructor.iap_user.profile_photo || ''} 
              alt={`${instructor.iap_user.first_name} ${instructor.iap_user.last_name}`}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {instructor.iap_user.first_name} {instructor.iap_user.last_name}
            </h3>
            {instructor.designation && (
              <p className="text-gray-600 dark:text-gray-300 mb-4">{instructor.designation}</p>
            )}
            {instructor.description && (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {instructor.description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 
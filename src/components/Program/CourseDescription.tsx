import { Program } from "@/types/program";
import { Award, Book, Clock, Target, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface CourseDescriptionProps {
  program: Program;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CourseDescription({ program }: CourseDescriptionProps) {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className=" mx-auto space-y-8"
    >
      {/* Overview Cards */}
      <motion.div 
        variants={container}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div 
          variants={item}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Duration</p>
              <p className="text-gray-600 dark:text-gray-300">{program.duration_in_weeks} weeks</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={item}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <Book className="w-6 h-6 text-green-500 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Level</p>
              <p className="text-gray-600 dark:text-gray-300 capitalize">{program.course_level}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={item}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <Target className="w-6 h-6 text-orange-500 dark:text-orange-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Certificate</p>
              <p className="text-gray-600 dark:text-gray-300">
                {program.enable_certificate ? "Included" : "Not Available"}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={item}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <Award className="w-6 h-6 text-purple-500 dark:text-purple-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Access</p>
              <p className="text-gray-600 dark:text-gray-300">
                {program.access_post_graduation_in_weeks} weeks after graduation
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Description */}
      <motion.div 
        variants={item}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Course</h2>
          <div 
            className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: program.long_description }}
          />
        </div>
      </motion.div>

      {/* What You'll Learn */}
      <motion.div 
        variants={item}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">What You&apos;ll Learn</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {program.what_will_student_learn.split(',').map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1">
                <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-300">{item.trim()}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Prerequisites */}
      <motion.div 
        variants={item}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Prerequisites</h2>
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          {program.prerequisite_for_course}
        </div>
      </motion.div>
    </motion.div>
  );
} 
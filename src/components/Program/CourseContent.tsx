import {  FileText, PlayCircle, PenLine, Lock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/types/program";

interface CourseContentProps {
  sections: Section[];
}

const contentTypeIcons = {
  lesson: <PlayCircle className="w-5 h-5 text-blue-500" />,
  quiz: <FileText className="w-5 h-5 text-emerald-500" />,
  quota: <PenLine className="w-5 h-5 text-orange-500" />,
};

const contentTypeLabels = {
  lesson: "Video Lesson",
  quiz: "Quiz Assessment",
  quota: "Assignment",
};

export default function CourseContent({ sections = [] }: CourseContentProps) {
  const totalItems = sections.reduce((total, section) => total + section.content.length, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Content</h2>
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>{sections?.length} sections</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <PlayCircle className="w-4 h-4" />
            <span>{totalItems} lessons</span>
          </div>
        </div>
      </div>
      
      <Accordion 
        type="single" 
        collapsible 
        className="divide-y divide-gray-200 dark:divide-gray-800"
      >
        {sections?.map((section) => (
          <AccordionItem 
            key={section.id} 
            value={section.id} 
            className="border-none"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline data-[state=open]:bg-gray-50 dark:data-[state=open]:bg-gray-800/50 transition-colors">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-start">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Section {section.index}: {section.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {section.content.length} items
                    </p>
                    {section.days_to_complete && (
                      <>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {section.days_to_complete} days
                        </p>
                      </>
                    )}
                  </div>
                </div>
              
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <AnimatePresence>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1 px-6 pb-4"
                >
                  {section.content.map((item, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={item.id}
                      className={`group flex items-center gap-3 p-3 rounded-lg transition-all
                        ${item.is_unlocked 
                          ? "hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer" 
                          : "opacity-60 cursor-not-allowed"
                        }`}
                    >
                      <div className="relative">
                        {item.is_unlocked ? (
                          <>
                            <div className="absolute -inset-1 bg-gray-100 dark:bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative">
                              {contentTypeIcons[item.content_type]}
                            </div>
                          </>
                        ) : (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {contentTypeLabels[item.content_type]}
                          </p>
                          {!item.can_skip && (
                            <>
                              <span className="text-gray-300 dark:text-gray-600">•</span>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Required
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      {item.is_completed && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
} 
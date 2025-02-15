'use client';

import { Program } from "@/types/program";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CourseHeader from "./CourseHeader";
import CourseContent from "./CourseContent";
import CourseDescription from "./CourseDescription";
import CourseInstructor from "./CourseInstructor";
import { BookOpen, Layout, User2, MessageSquare } from "lucide-react";
import CourseReviewers from "./CourseReviewers";

interface CourseDetailsProps {
  program: Program;
}

const tabs = [
  {
    id: 'content',
    label: 'Course Content',
    title: 'Course Content & Curriculum',
    icon: <Layout className="w-5 h-5" />,
  },
  {
    id: 'description',
    label: 'Description',
    title: 'Course Description',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: 'instructor',
    label: 'Instructor',
    title: 'Meet Your Instructor',
    icon: <User2 className="w-5 h-5" />,
  },
  {
    id: 'reviewers',
    label: 'Reviewers',
    title: 'Course Reviewers',
    icon: <MessageSquare className="w-5 h-5" />,
  },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function CourseDetails({ program }: CourseDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('content');
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <CourseHeader program={program} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Custom Tabs */}
        <div className="relative mb-12">
          <div className="flex flex-wrap justify-center items-center gap-2 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium transition-all
                  ${activeTab === tab.id 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
              >
                {tab.icon}
                <span className="text-sm">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-8">
          <motion.h2
            key={activeTab}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            {activeTabData?.title}
          </motion.h2>
        </div>

        {/* Tab Content */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'content' && (
                <CourseContent sections={program.section} />
              )}
              {activeTab === 'description' && (
                <CourseDescription program={program} />
              )}
              {activeTab === 'instructor' && program.instructor && (
                <CourseInstructor instructor={program.instructor} />
              )}
              {activeTab === 'reviewers' && (
                <CourseReviewers reviewers={program.reviewers} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 
// components/Home/FeaturedPrograms.tsx
"use client"

import { motion } from "framer-motion"
import { Program } from "@/types/program"
import ProgramCard from '@/components/Programs/ProgramCard'
import { useTheme } from "@/context/ThemeContext"
import { ArrowRight } from "lucide-react"
import Link from 'next/link'

interface FeaturedProgramsProps {
  initialPrograms: Program[];
}

const FeaturedPrograms = ({ initialPrograms }: FeaturedProgramsProps) => {
  const { config } = useTheme();

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: config?.primary_color }}>
            Featured Programs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of top-rated programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {initialPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProgramCard program={program} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center"
        >
          <Link
            href="/programs"
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium 
                     transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{ 
              color: config?.primary_color,
              backgroundColor: `${config?.primary_color}10`,
              boxShadow: `0 0 0 1px ${config?.primary_color}25`
            }}
          >
            <span>Browse All Programs</span>
            <ArrowRight 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              style={{ color: config?.primary_color }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedPrograms;
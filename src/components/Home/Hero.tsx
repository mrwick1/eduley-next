import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="relative min-h-[500px] bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Future With{" "}
              <span className="text-primary">Expert Education</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-lg">
              Access world-class education resources and expert mentorship to achieve
              your career goals and unlock your full potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/programs"
                className="px-6 sm:px-8 py-3 bg-primary text-white rounded-lg font-semibold 
                hover:bg-primary/90 transition-colors text-center"
              >
                Explore Programs
              </Link>
              <Link
                href="/about"
                className="px-6 sm:px-8 py-3 border-2 border-primary text-primary rounded-lg 
                font-semibold hover:bg-primary/10 transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8 pt-4">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">500+</p>
                <p className="text-xs sm:text-sm text-gray-600">Active Students</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">50+</p>
                <p className="text-xs sm:text-sm text-gray-600">Expert Mentors</p>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <p className="text-2xl sm:text-3xl font-bold text-primary">95%</p>
                <p className="text-xs sm:text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] mt-8 lg:mt-0">
            <Image
              src="https://media.istockphoto.com/id/1358014313/photo/group-of-elementary-students-having-computer-class-with-their-teacher-in-the-classroom.jpg?s=612x612&w=0&k=20&c=3xsykmHXFa9ejL_sP2Xxiow7zdtmKvg15UxXFfgR98Q="
              alt="Students collaborating in a modern learning environment"
              fill
              className="object-cover rounded-xl sm:rounded-2xl shadow-xl"
              priority
              unoptimized
            />
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-primary/10 p-2 sm:p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">Innovation Hub</p>
                  <p className="text-xs sm:text-sm text-gray-600">Learn by doing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero


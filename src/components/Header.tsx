"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Bell, Menu, X, Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "@/context/ThemeContext"
import { usePathname } from 'next/navigation'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// Static header content that will be rendered initially
const StaticHeader = () => (
  <header className="fixed w-full top-0 z-50">
    <div className="absolute inset-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" />
    <div className="container relative mx-auto px-4 h-20 flex items-center justify-between">
      <Link 
        href="/" 
        className="text-2xl font-bold text-gray-900 dark:text-white hover:opacity-90 transition-opacity"
      >
        Eduley
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        <Link 
          href="/" 
          className="text-gray-600 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Home
        </Link>
        <Link 
          href="/programs" 
          className="text-gray-600 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Programs
        </Link>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          Login / Sign Up
        </Button>
      </nav>
      <div className="md:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </div>
  </header>
)

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      prefetch={true}
      className={`font-medium transition-colors
        ${isActive 
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
    >
      {children}
    </Link>
  );
};

// Dynamic header with full functionality
const DynamicHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { config, theme, setTheme } = useTheme()

  useEffect(() => {
    // Here you would check your auth state
    // For example: const authStatus = await checkAuthStatus()
    setIsLoggedIn(true) // Replace with actual auth check
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="fixed w-full top-0 z-50">
      <div className="absolute inset-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" />
      <div className="container relative mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-gray-900 dark:text-white hover:opacity-90 transition-opacity">
          {config?.logo ? (
            <Image
              src={config.logo}
              alt={config?.name || 'Institute Logo'}
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          ) : (
            <span className="text-xl font-bold">
              {config?.name || 'Eduley'}
            </span>
          )}
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/programs">Programs</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink href="/my-programs">My Programs</NavLink>
              <NavLink href="/discussion">Discussion</NavLink>
              <NavLink href="/help">Help</NavLink>
              <div className="flex items-center gap-6 pl-4 border-l border-gray-200 dark:border-gray-700">
                <button 
                  onClick={toggleTheme}
                  className="relative group"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  )}
                </button>
                <button className="relative group">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full" />
                </button>
                <Avatar className="h-9 w-9 ring-1 ring-gray-200 dark:ring-gray-700">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="object-cover" />
                  <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-sm font-medium">CN</AvatarFallback>
                </Avatar>
              </div>
            </>
          ) : (
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
              Login / Sign Up
            </Button>
          )}
        </nav>
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {isMobileMenuOpen ? 
              <X className="h-5 w-5" /> : 
              <Menu className="h-5 w-5" />
            }
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg"
        >
          <nav className="container mx-auto flex flex-col py-4 space-y-1 px-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/programs">Programs</NavLink>
            {isLoggedIn ? (
              <>
                <NavLink href="/my-programs">My Programs</NavLink>
                <NavLink href="/discussion">Discussion</NavLink>
                <NavLink href="/help">Help</NavLink>
                <div className="flex items-center gap-4 px-4 py-2.5 mt-2 border-t border-gray-200 dark:border-gray-700">
                  <button onClick={toggleTheme}>
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    )}
                  </button>
                  <button className="relative">
                    <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full" />
                  </button>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-sm font-medium">CN</AvatarFallback>
                  </Avatar>
                </div>
              </>
            ) : (
              <div className="px-4 py-2.5">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                  Login / Sign Up
                </Button>
              </div>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  )
}

// Main Header component with client-side hydration
const Header = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <StaticHeader />
  }

  return <DynamicHeader />
}

export default Header


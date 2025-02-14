"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "@/context/ThemeContext"
import { usePathname } from 'next/navigation'

// Static header content that will be rendered initially
const StaticHeader = () => (
  <header className="fixed w-full top-0 z-50">
    <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border-b border-gray-100/20" />
    <div className="container relative mx-auto px-4 h-20 flex items-center justify-between">
      <Link 
        href="/" 
        className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent hover:opacity-70 transition-opacity"
      >
        Eduley
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        <Link 
          href="/" 
          className="text-gray-700 font-medium hover:text-primary transition-colors relative group"
        >
          Home
          <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
        </Link>
        <Link 
          href="/programs" 
          className="text-gray-700 font-medium hover:text-primary transition-colors relative group"
        >
          Programs
          <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
        </Link>
        <Button 
          className="bg-primary/90 hover:bg-primary text-white shadow-lg shadow-primary/20 
                     hover:shadow-primary/30 transition-all duration-300"
        >
          Login / Sign Up
        </Button>
      </nav>
      <div className="md:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-gray-100/50 transition-colors"
        >
          <Menu className="h-5 w-5 text-gray-700" />
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
      className={`text-gray-700 font-medium transition-colors relative group
        ${isActive ? 'text-primary' : 'hover:text-primary'}`}
    >
      {children}
      <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-primary transition-transform
        ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} 
      />
    </Link>
  );
};

// Dynamic header with full functionality
const DynamicHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { config } = useTheme()

  useEffect(() => {
    // Here you would check your auth state
    // For example: const authStatus = await checkAuthStatus()
    setIsLoggedIn(true) // Replace with actual auth check
  }, [])

  return (
    <header className="fixed w-full top-0 z-50">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border-b border-gray-100/20" />
      <div className="container relative mx-auto px-4 h-20 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent hover:opacity-70 transition-opacity"
        >
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
            <span className="text-xl font-bold" style={{ color: config?.primary_color }}>
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
              <div className="flex items-center gap-6 pl-4 border-l border-gray-200">
                <button className="relative group">
                  <Bell className="h-5 w-5 text-gray-700 group-hover:text-primary transition-colors" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full group-hover:animate-pulse" />
                </button>
                <Avatar className="h-9 w-9 ring-2 ring-primary/10 hover:ring-primary/30 transition-all duration-300">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="object-cover" />
                  <AvatarFallback className="bg-primary/5 text-sm font-medium">CN</AvatarFallback>
                </Avatar>
              </div>
            </>
          ) : (
            <Button 
              className="bg-primary/90 hover:bg-primary text-white shadow-lg shadow-primary/20 
                         hover:shadow-primary/30 transition-all duration-300"
            >
              Login / Sign Up
            </Button>
          )}
        </nav>
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hover:bg-gray-100/50 transition-colors"
          >
            {isMobileMenuOpen ? 
              <X className="h-5 w-5 text-gray-700" /> : 
              <Menu className="h-5 w-5 text-gray-700" />
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
          className="relative md:hidden bg-white/60 backdrop-blur-xl border-b border-gray-100/20 shadow-xl"
        >
          <nav className="container mx-auto flex flex-col py-4 space-y-1 px-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/programs">Programs</NavLink>
            {isLoggedIn ? (
              <>
                <NavLink href="/my-programs">My Programs</NavLink>
                <NavLink href="/discussion">Discussion</NavLink>
                <NavLink href="/help">Help</NavLink>
                <div className="flex items-center gap-4 px-4 py-2.5 mt-2 border-t border-gray-100">
                  <button className="relative">
                    <Bell className="h-5 w-5 text-gray-700" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                  </button>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback className="text-sm font-medium">CN</AvatarFallback>
                  </Avatar>
                </div>
              </>
            ) : (
              <div className="px-4 py-2.5">
                <Button 
                  className="w-full bg-primary/90 hover:bg-primary text-white shadow-lg shadow-primary/20 
                             hover:shadow-primary/30 transition-all duration-300"
                >
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


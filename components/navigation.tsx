"use client"

import { Heart, MapPin, Users, Calendar, School2, Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CharityConnect</span>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/community" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <Users className="w-4 h-4" />
              <span>Communities</span>
            </Link>
            <Link href="/#map" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Map</span>
            </Link>
            <Link href="/opportunities" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Opportunities</span>
            </Link>
            <Link href="/location" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <School2 className="w-4 h-4" />
              <span>Schools</span>
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="default" className="glass-hover">Sign In</Button>
            <Button size="default">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:bg-accent rounded-lg transition-all duration-200 active:scale-95"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                  isOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'
                }`} 
              />
              <X 
                className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                  isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-4 space-y-1">
            <Link 
              href="/community" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-2 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Users className="w-4 h-4" />
              <span>Communities</span>
            </Link>
            <Link 
              href="/#map" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-2 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <MapPin className="w-4 h-4" />
              <span>Map</span>
            </Link>
            <Link 
              href="/opportunities" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-2 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Calendar className="w-4 h-4" />
              <span>Opportunities</span>
            </Link>
            <Link 
              href="/location" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-2 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <School2 className="w-4 h-4" />
              <span>Schools</span>
            </Link>
            <div className="flex flex-col gap-2 pt-3">
              <Button variant="outline" size="default" className="w-full glass-hover">Sign In</Button>
              <Button size="default" className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

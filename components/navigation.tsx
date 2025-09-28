"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X, MapPin, Users, Calendar, NavigationIcon } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CharityConnect</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/community"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Communities</span>
            </Link>
            <a
              href="/#map"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Map</span>
            </a>
            <Link
              href="/opportunities"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Opportunities</span>
            </Link>
            <Link
              href="/location"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
            >
              <NavigationIcon className="w-4 h-4" />
              <span>Near Me</span>
            </Link>
            <Button variant="outline" className="glass-hover bg-transparent">
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/community" className="block text-muted-foreground hover:text-foreground transition-colors">
              Communities
            </Link>
            <a href="/#map" className="block text-muted-foreground hover:text-foreground transition-colors">
              Map
            </a>
            <Link href="/opportunities" className="block text-muted-foreground hover:text-foreground transition-colors">
              Opportunities
            </Link>
            <Link href="/location" className="block text-muted-foreground hover:text-foreground transition-colors">
              Near Me
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="outline" className="glass-hover bg-transparent">
                Sign In
              </Button>
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

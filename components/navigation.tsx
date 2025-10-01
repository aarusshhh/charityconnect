"use client"

import { Heart, MapPin, Users, Calendar, School2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo on the left */}
          <div className="w-64">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CharityConnect</span>
            </Link>
          </div>

          {/* Nav links in the center */}
          <div className="flex items-center space-x-8">
            <Link href="/community" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <Users className="w-4 h-4" />
              <span>Communities</span>
            </Link>
            <Link href="/#map" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <MapPin className="w-4 h-4" />
              <span>Map</span>
            </Link>
            <Link href="/opportunities" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <Calendar className="w-4 h-4" />
              <span>Opportunities</span>
            </Link>
            <Link href="/location" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <School2 className="w-4 h-4" />
              <span>Schools</span>
            </Link>
          </div>

          {/* Buttons on the far right */}
          <div className="w-64 flex justify-end space-x-3">
            <Button variant="outline" className="glass-hover bg-transparent">Sign In</Button>
            <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

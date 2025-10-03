"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, UserCircle, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"

// Define User interface
interface User {
  id: number
  name: string
  email: string
  password: string
}

export default function AuthPage() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Helper: Convert users array to CSV string
  const usersToCSV = (users: User[]): string => {
    const headers = ['id', 'name', 'email', 'password'].map(h => `"${h}"`).join(',')
    const rows = users.map(user => [
      user.id.toString(),
      `"${user.name.replace(/"/g, '""')}"`,
      `"${user.email.replace(/"/g, '""')}"`,
      `"${user.password.replace(/"/g, '""')}"`
    ].join(','))
    return [headers, ...rows].join('\n')
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return // Prevent duplicate submissions

    setIsSubmitting(true)
    setError("")

    if (!formData.email || !formData.password) {
      setError("Email and password are required!")
      setIsSubmitting(false)
      return
    }

    // Get existing users from localStorage
    const storedUsersData = localStorage.getItem("charityUsers")
    const existingUsers: User[] = storedUsersData ? JSON.parse(storedUsersData) : []

    // Sign-Up logic
    if (mode === "signUp") {
      if (!formData.name) {
        setError("Name is required!")
        setIsSubmitting(false)
        return
      }
      if (existingUsers.some(u => u.email === formData.email)) {
        setError("Email already registered!")
        setIsSubmitting(false)
        return
      }

      // Create new user
      const newUser: User = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password // WARNING: Never store passwords in plain text in production!
      }

      // Update users array and save to localStorage
      localStorage.setItem("charityUsers", JSON.stringify([...existingUsers, newUser]))
      localStorage.setItem("currentUser", formData.email)

      // Generate CSV and trigger download
      const csvContent = usersToCSV([...existingUsers, newUser])
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "charity_users.csv"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      // Reset state and redirect
      setFormData({ email: "", password: "", name: "" })
      setIsSubmitting(false)
      router.push("/")
      return
    }

    // Sign-In logic
    const user = existingUsers.find(u => 
      u.email === formData.email && u.password === formData.password
    )
    if (!user) {
      setError("Invalid email or password!")
      setIsSubmitting(false)
      return
    }

    localStorage.setItem("currentUser", user.email)
    setFormData({ email: "", password: "", name: "" })
    setIsSubmitting(false)
    router.push("/")
  }

  // Animation: Fade-in on mount
  useEffect(() => {
    const card = document.querySelector(".auth-card")
    if (card) {
      card.style.opacity = "0"
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, 50)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card 
        className={cn(
          "glass max-w-xl w-full p-6 auth-card",
          "relative rounded-3xl", // Liquid glass rounded corners
          "animate-fade-in bg-background/80 backdrop-filter backdrop-blur-lg" // Liquid glass effect
        )}
      >
        {/* Back Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-4 left-4 glass-hover text-muted-foreground hover:text-foreground" 
          onClick={router.back}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2 mb-6">
            {mode === "signIn" ? (
              <UserCircle className="w-6 h-6" />
            ) : (
              <UserPlus className="w-6 h-6" />
            )}
            <span className="font-bold text-xl">{mode === "signIn" ? "Sign In" : "Sign Up"}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="text-destructive text-sm text-center mb-4 p-2 rounded-lg bg-destructive/10 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className={cn(
                "w-full rounded-lg border-none",
                "focus:ring focus:ring-primary/20 focus:bg-background", // Smooth focus animation
                "transition-all duration-300"
              )}
              disabled={isSubmitting}
            />

            {/* Password Input */}
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
              className={cn(
                "w-full rounded-lg border-none",
                "focus:ring focus:ring-primary/20 focus:bg-background",
                "transition-all duration-300"
              )}
              disabled={isSubmitting}
            />

            {/* Name Input (Sign Up Only) */}
            {mode === "signUp" && (
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className={cn(
                  "w-full rounded-lg border-none",
                  "focus:ring focus:ring-primary/20 focus:bg-background",
                  "transition-all duration-300"
                )}
                disabled={isSubmitting}
              />
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 rounded-lg" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : mode === "signIn" ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          {/* Mode Toggle */}
          <div className="text-center mt-4">
            <span className="text-muted-foreground">
              {mode === "signIn" ? "Don't have an account?" : "Already have an account?"}
            </span>
            <Button 
              variant="link" 
              size="sm" 
              onClick={() => {
                setMode(prev => prev === "signIn" ? "signUp" : "signIn")
                setError("")
                setFormData({ email: "", password: "", name: "" })
                setIsSubmitting(false)
              }} 
              className="ml-2 text-primary transition-colors hover:text-primary-foreground"
            >
              {mode === "signIn" ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

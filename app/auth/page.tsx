"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, UserCircle, UserPlus, Mail, Lock, User } from "lucide-react"
import { cn } from "@/lib/utils"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setError("")

    if (!formData.email || !formData.password) {
      setError("Email and password are required!")
      setIsSubmitting(false)
      return
    }

    const storedUsersData = localStorage.getItem("charityUsers")
    const existingUsers: User[] = storedUsersData ? JSON.parse(storedUsersData) : []

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

      const newUser: User = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password
      }

      localStorage.setItem("charityUsers", JSON.stringify([...existingUsers, newUser]))
      localStorage.setItem("currentUser", formData.email)

      setFormData({ email: "", password: "", name: "" })
      setIsSubmitting(false)
      router.push("/")
      return
    }

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

  useEffect(() => {
    const card = document.querySelector(".auth-card")
    if (card) {
      card.classList.add("opacity-0", "translate-y-4")
      setTimeout(() => {
        card.classList.remove("opacity-0", "translate-y-4")
      }, 50)
    }
  }, [mode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <Card 
        className={cn(
          "max-w-md w-full auth-card transition-all duration-500 ease-out border-none shadow-2xl",
          "bg-background/95 backdrop-blur-xl"
        )}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 left-4 hover:bg-muted/50 transition-all" 
          onClick={() => router.push("/")}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <CardHeader className="space-y-4 pb-8 pt-12">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            {mode === "signIn" ? (
              <UserCircle className="w-8 h-8 text-primary" />
            ) : (
              <UserPlus className="w-8 h-8 text-primary" />
            )}
          </div>
          <CardTitle className="text-center text-3xl font-bold tracking-tight">
            {mode === "signIn" ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            {mode === "signIn" 
              ? "Sign in to continue your journey" 
              : "Join us to make a difference"}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="text-destructive text-sm text-center p-3 rounded-xl bg-destructive/10 border border-destructive/20 animate-in fade-in-0 slide-in-from-top-1">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signUp" && (
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="pl-11 h-12 bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                  disabled={isSubmitting}
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="pl-11 h-12 bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                disabled={isSubmitting}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                className="pl-11 h-12 bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                disabled={isSubmitting}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                mode === "signIn" ? "Sign In" : "Create Account"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                {mode === "signIn" ? "New to CharityConnect?" : "Already have an account?"}
              </span>
            </div>
          </div>

          <Button 
            type="button"
            variant="ghost" 
            className="w-full h-12 font-medium hover:bg-muted/50" 
            onClick={() => {
              setMode(prev => prev === "signIn" ? "signUp" : "signIn")
              setError("")
              setFormData({ email: "", password: "", name: "" })
              setIsSubmitting(false)
            }}
          >
            {mode === "signIn" ? "Create an account" : "Sign in instead"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

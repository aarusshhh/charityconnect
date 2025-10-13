"use client"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ChevronLeft, UserCircle, UserPlus, Mail, Lock, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { TEMP_ADMIN } from "@/data/temp-admin"

interface User {
  id: number
  name: string
  email: string
  password: string
  userType: "school" | "ngo" | "admin"
  schoolName?: string
}

const schoolOptions = [
  "Dunes International School",
  "ADIS",
  "SEPS",
  "Repton",
  "The British International School"
]

export default function AuthPage() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn")
  const [userType, setUserType] = useState<"school" | "ngo">("school")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    schoolName: schoolOptions[0] || ""
  })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setError("")

    if (!formData.email || !formData.password || (mode === "signUp" && !formData.name)) {
      setError("All required fields must be filled!")
      setIsSubmitting(false)
      return
    }
    if (mode === "signIn" && formData.email === TEMP_ADMIN.email && formData.password === TEMP_ADMIN.password) {
  // Check if TEMP_ADMIN already exists in localStorage
  const storedUsersData = localStorage.getItem("charityUsers")
  const existingUsers: User[] = storedUsersData ? JSON.parse(storedUsersData) : []

  let tempUser = existingUsers.find(u => u.email === TEMP_ADMIN.email)
  if (!tempUser) {
    tempUser = {
      id: Date.now(),
      name: TEMP_ADMIN.name,
      email: TEMP_ADMIN.email,
      password: TEMP_ADMIN.password,
      userType: "admin",
    }
    localStorage.setItem("charityUsers", JSON.stringify([...existingUsers, tempUser]))
  }

  localStorage.setItem("currentUser", TEMP_ADMIN.email)
  setFormData({ name: "", email: "", password: "", schoolName: schoolOptions[0] || "" })
  setIsSubmitting(false)
  router.push("/")
  return
}

    const storedUsersData = localStorage.getItem("charityUsers")
    const existingUsers: User[] = storedUsersData ? JSON.parse(storedUsersData) : []

    if (mode === "signUp") {
      if (existingUsers.some(u => u.email === formData.email)) {
        setError("Email already registered!")
        setIsSubmitting(false)
        return
      }

      const newUser: User = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType,
        schoolName: userType === "school" ? formData.schoolName : undefined
      }

      localStorage.setItem("charityUsers", JSON.stringify([...existingUsers, newUser]))
      localStorage.setItem("currentUser", newUser.email)
      setFormData({ name: "", email: "", password: "", schoolName: schoolOptions[0] || "" })
      setIsSubmitting(false)
      router.push("/")
      return
    }

    const user = existingUsers.find(u => u.email === formData.email && u.password === formData.password)
    if (!user) {
      setError("Invalid email or password!")
      setIsSubmitting(false)
      return
    }

    localStorage.setItem("currentUser", user.email)
    setFormData({ name: "", email: "", password: "", schoolName: schoolOptions[0] || "" })
    setIsSubmitting(false)
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
    <Navigation />
      <Card className={cn("max-w-md w-full transition-all duration-500 ease-out border-none shadow-2xl", "bg-background/95 backdrop-blur-xl")}>
        <Button variant="ghost" size="icon" className="absolute top-4 left-4 hover:bg-muted/50 transition-all" onClick={() => router.push("/")}>
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <CardHeader className="space-y-4 pb-8 pt-12">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            {mode === "signIn" ? <UserCircle className="w-8 h-8 text-primary" /> : <UserPlus className="w-8 h-8 text-primary" />}
          </div>
          <CardTitle className="text-center text-3xl font-bold tracking-tight">{mode === "signIn" ? "Welcome Back" : "Create Account"}</CardTitle>
          <p className="text-center text-sm text-muted-foreground">{mode === "signIn" ? "Sign in to continue your journey" : "Join us to make a difference"}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && <div className="text-destructive text-sm text-center p-3 rounded-xl bg-destructive/10 border border-destructive/20">{error}</div>}

          {mode === "signUp" && (
            <div className="flex justify-center gap-4 mb-2">
              <Button size="sm" variant={userType === "school" ? "default" : "outline"} onClick={() => setUserType("school")}>School</Button>
              <Button size="sm" variant={userType === "ngo" ? "default" : "outline"} onClick={() => setUserType("ngo")}>NGO</Button>
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

            {/* School Dropdown for school users */}
            {mode === "signUp" && userType === "school" && (
              <select
                className="w-full h-12 bg-muted/50 border-none pl-3 rounded-lg focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                value={formData.schoolName}
                onChange={(e) => setFormData(prev => ({ ...prev, schoolName: e.target.value }))}
                disabled={isSubmitting}
              >
                {schoolOptions.map((school) => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            )}

            {mode === "signUp" && userType === "ngo" && (
              <Input
                placeholder="NGO Name"
                value={formData.schoolName}
                onChange={(e) => setFormData(prev => ({ ...prev, schoolName: e.target.value }))}
                required
                className="w-full h-12 bg-muted/50 border-none pl-3 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                disabled={isSubmitting}
              />
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

            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : mode === "signIn" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-transparent text-violet-300">{mode === "signIn" ? "New to danai?" : "Already have an account?"}</span>
            </div>
          </div>

          <Button type="button" variant="ghost" className="w-full h-12 font-medium hover:bg-muted/50" onClick={() => {
            setMode(prev => prev === "signIn" ? "signUp" : "signIn")
            setUserType("school")
            setFormData({ name: "", email: "", password: "", schoolName: schoolOptions[0] || "" })
            setError("")
            setIsSubmitting(false)
          }}>
            {mode === "signIn" ? "Create an account" : "Sign in instead"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface User {
  id: number
  name: string
  email: string
  password: string
  userType?: "school" | "ngo" | "admin"
  school?: string
  ngoName?: string
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const router = useRouter()

  useEffect(() => {
    const currentUserEmail = localStorage.getItem("currentUser")
    const storedUsersData = localStorage.getItem("charityUsers")
    const existingUsers: User[] = storedUsersData ? JSON.parse(storedUsersData) : []

    const currentUser = existingUsers.find(u => u.email === currentUserEmail)
    if (!currentUser || currentUser.userType !== "admin") {
      router.push("/") // Redirect non-admins
      return
    }

    setUsers(existingUsers)
  }, [router])

  const handleDelete = (id: number) => {
    const updatedUsers = users.filter(u => u.id !== id)
    localStorage.setItem("charityUsers", JSON.stringify(updatedUsers))
    setUsers(updatedUsers)
  }

  return (
    <div className="min-h-screen bg-muted/10 p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
          <p className="text-sm text-muted-foreground">Manage registered users</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {users.length === 0 ? (
            <p className="text-center text-muted-foreground">No users found.</p>
          ) : (
            <div className="space-y-2">
              {users.map(user => (
                <div
                  key={user.id}
                  className="flex justify-between items-center p-3 border rounded-lg bg-background/80"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.userType === "school" && `School: ${user.school}`}
                      {user.userType === "ngo" && `NGO: ${user.ngoName}`}
                      {user.userType === "admin" && `Admin`}
                    </p>
                  </div>
                  {user.userType !== "admin" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

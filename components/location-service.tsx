"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Trophy, AlertTriangle, Leaf, Activity, School } from "lucide-react"

interface SchoolData {
  id: number
  name: string
  emissions: number // in tons CO₂ per week
  score: number
  rank: number
  alerts?: string[]
}

const mockSchools: SchoolData[] = [
  { id: 1, name: "Dunes International School", emissions: 14, score: 92, rank: 1, alerts: ["Excellent performance this week!"] },
  { id: 2, name: "Abu Dhabi Indian School", emissions: 19, score: 84, rank: 2, alerts: ["Slight increase in emissions."] },
  { id: 3, name: "Sunrise English Private School", emissions: 24, score: 76, rank: 3, alerts: ["Great improvement in recycling."] },
  { id: 4, name: "Repton School Abu Dhabi", emissions: 37, score: 61, rank: 4, alerts: ["Energy usage is too high."] },
  { id: 5, name: "The British International School", emissions: 45, score: 52, rank: 5, alerts: ["Immediate action required on waste reduction."] },
]

const scoreColors = {
  high: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function LocationService() {
  const [schools, setSchools] = useState<SchoolData[]>(mockSchools)
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null)
  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    contactPerson: "",
    email: "",
    phone: "",
    emissions: "",
    score: "",
  })
  const [error, setError] = useState("")

  const getScoreCategory = (score: number) => {
    if (score >= 85) return "high"
    if (score >= 60) return "medium"
    return "low"
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // All fields required
    for (const key in newSchool) {
      if (!newSchool[key as keyof typeof newSchool]) {
        setError("All fields are required!")
        return
      }
    }
    // Always show fake error
    setError("Could not update database")
  }

  return (
    <div className="space-y-6">

      {/* Overview Card */}
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span>School Sustainability Challenge</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="glass rounded-lg p-4">
              <div className="text-2xl font-bold text-primary mb-1">{schools.length}</div>
              <div className="text-xs text-muted-foreground">Schools Competing</div>
            </div>
            <div className="glass rounded-lg p-4">
              <div className="text-2xl font-bold text-primary mb-1">
                {schools.filter((s) => s.score >= 85).length}
              </div>
              <div className="text-xs text-muted-foreground">High Scoring Schools</div>
            </div>
            <div className="glass rounded-lg p-4">
              <div className="text-2xl font-bold text-primary mb-1">
                {schools.filter((s) => s.score < 60).length}
              </div>
              <div className="text-xs text-muted-foreground">Needs Improvement</div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">Get Started with Schools</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Register Your School</DialogTitle>
                </DialogHeader>
                <form className="space-y-4 mt-2" onSubmit={handleRegister}>
                  <Input
                    placeholder="School Name"
                    value={newSchool.name}
                    onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="School Address"
                    value={newSchool.address}
                    onChange={(e) => setNewSchool({ ...newSchool, address: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="City"
                    value={newSchool.city}
                    onChange={(e) => setNewSchool({ ...newSchool, city: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Postal Code"
                    value={newSchool.postalCode}
                    onChange={(e) => setNewSchool({ ...newSchool, postalCode: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Contact Person"
                    value={newSchool.contactPerson}
                    onChange={(e) => setNewSchool({ ...newSchool, contactPerson: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={newSchool.email}
                    onChange={(e) => setNewSchool({ ...newSchool, email: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Phone Number"
                    value={newSchool.phone}
                    onChange={(e) => setNewSchool({ ...newSchool, phone: e.target.value })}
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Weekly Emissions (tons CO₂)"
                    value={newSchool.emissions}
                    onChange={(e) => setNewSchool({ ...newSchool, emissions: e.target.value })}
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Initial Score"
                    value={newSchool.score}
                    onChange={(e) => setNewSchool({ ...newSchool, score: e.target.value })}
                    required
                  />

                  {error && <p className="text-destructive text-sm">{error}</p>}

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Register School
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Card */}
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Leaderboard</span>
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
              {schools.length} schools
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schools.map((school) => (
              <div
                key={school.id}
                onClick={() => setSelectedSchool(school)}
                className="glass rounded-lg p-4 glass-hover cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm">{school.rank}. {school.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {school.emissions} tons CO₂ / week
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={scoreColors[getScoreCategory(school.score)]}>
                      {school.score} pts
                    </Badge>
                    {school.rank === 1 && <Trophy className="w-4 h-4 text-yellow-400" />}
                    {school.score < 60 && <AlertTriangle className="w-4 h-4 text-destructive" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" className="glass-hover bg-transparent">
              View Full Weekly Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Measurement Card */}
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>How We Measure Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Weekly carbon emissions are calculated based on energy consumption, transportation, and waste management metrics submitted by each school.  
            Scores are automatically assigned based on emission reduction performance. Alerts notify schools about areas for improvement.
          </p>
        </CardContent>
      </Card>

      {/* Alerts Popup */}
      {selectedSchool && (
        <Dialog open={!!selectedSchool} onOpenChange={() => setSelectedSchool(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedSchool.name} - Alerts</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {selectedSchool.alerts?.map((alert, i) => (
                <div key={i} className="glass p-3 rounded-lg text-sm text-muted-foreground">
                  {alert}
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

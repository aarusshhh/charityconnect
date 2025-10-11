"use client"
import { Navigation } from "@/components/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface SchoolMetrics {
  recyclingRates: string
  wasteReduction: string
  renewableEnergy: string
  conservationEfforts: string
  studentInitiatives: string
  greenPrograms: string
  usageReduction: string
  harvestingSystems: string
  approved?: boolean
}

export default function SchoolDashboard() {
  const [metrics, setMetrics] = useState<SchoolMetrics>({
    recyclingRates: "",
    wasteReduction: "",
    renewableEnergy: "",
    conservationEfforts: "",
    studentInitiatives: "",
    greenPrograms: "",
    usageReduction: "",
    harvestingSystems: "",
  })

  const [submissions, setSubmissions] = useState<SchoolMetrics[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("schoolSubmissions")
    if (stored) setSubmissions(JSON.parse(stored))
  }, [])

  const handleChange = (field: keyof SchoolMetrics, value: string) => {
    setMetrics(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    const newSubmission = { ...metrics, approved: false }
    const updated = [...submissions, newSubmission]
    setSubmissions(updated)
    localStorage.setItem("schoolSubmissions", JSON.stringify(updated))
    alert("Submitted for admin approval!")
    setMetrics({
      recyclingRates: "",
      wasteReduction: "",
      renewableEnergy: "",
      conservationEfforts: "",
      studentInitiatives: "",
      greenPrograms: "",
      usageReduction: "",
      harvestingSystems: "",
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
    <Navigation />
    <div className="h-12" />
      <h1 className="text-3xl font-bold mb-4">School Sustainability Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Submit your sustainability metrics for admin approval.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input placeholder="Recycling Rates (%)" value={metrics.recyclingRates} onChange={e => handleChange("recyclingRates", e.target.value)} />
        <Input placeholder="Waste Reduction Initiatives" value={metrics.wasteReduction} onChange={e => handleChange("wasteReduction", e.target.value)} />
        <Input placeholder="Renewable Energy Usage" value={metrics.renewableEnergy} onChange={e => handleChange("renewableEnergy", e.target.value)} />
        <Input placeholder="Conservation Efforts" value={metrics.conservationEfforts} onChange={e => handleChange("conservationEfforts", e.target.value)} />
        <Input placeholder="Student Initiatives" value={metrics.studentInitiatives} onChange={e => handleChange("studentInitiatives", e.target.value)} />
        <Input placeholder="Green Programs" value={metrics.greenPrograms} onChange={e => handleChange("greenPrograms", e.target.value)} />
        <Input placeholder="Usage Reduction" value={metrics.usageReduction} onChange={e => handleChange("usageReduction", e.target.value)} />
        <Input placeholder="Harvesting Systems" value={metrics.harvestingSystems} onChange={e => handleChange("harvestingSystems", e.target.value)} />
      </div>

      <Button onClick={handleSubmit} className="mt-4 bg-primary hover:bg-primary/90">Submit for Approval</Button>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-muted-foreground">No submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {submissions.map((s, idx) => (
              <div key={idx} className="p-4 border rounded-lg bg-muted/20">
                <p><strong>Recycling Rates:</strong> {s.recyclingRates}</p>
                <p><strong>Waste Reduction:</strong> {s.wasteReduction}</p>
                <p><strong>Renewable Energy:</strong> {s.renewableEnergy}</p>
                <p><strong>Conservation:</strong> {s.conservationEfforts}</p>
                <p><strong>Student Initiatives:</strong> {s.studentInitiatives}</p>
                <p><strong>Green Programs:</strong> {s.greenPrograms}</p>
                <p><strong>Usage Reduction:</strong> {s.usageReduction}</p>
                <p><strong>Harvesting Systems:</strong> {s.harvestingSystems}</p>
                <p className={`mt-2 font-medium ${s.approved ? "text-green-500" : "text-yellow-500"}`}>
                  {s.approved ? "Approved ✅" : "Pending Approval ⏳"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import { VolunteerOpportunities } from "@/components/volunteer-opportunities"
import { Navigation } from "@/components/navigation"

export default function OpportunitiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <VolunteerOpportunities />
      </div>
    </main>
  )
}

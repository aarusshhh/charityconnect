import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { ImpactStats } from "@/components/impact-stats"
import { CommunityMap } from "@/components/community-map"
import { CallToAction } from "@/components/call-to-action"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ImpactStats />
      <Features />
      <CommunityMap />
      <CallToAction />
    </main>
  )
}

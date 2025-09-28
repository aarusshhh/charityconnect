import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Users, MapPin } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-4 md:left-10 w-48 h-48 md:w-72 md:h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-4 md:right-10 w-64 h-64 md:w-96 md:h-96 bg-chart-2/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-80 md:h-80 bg-chart-3/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 md:space-y-8">
          <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 md:px-6 md:py-3 text-sm">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Connecting communities across the UAE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight px-2">
            Make a difference in the <span className="text-primary">UAE</span> community
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-4">
            CharityConnect UAE connects you with local charity organizations across all seven emirates. Discover
            volunteer opportunities, join community initiatives, and make a real impact in your neighborhood.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 md:pt-8 px-4">
            <Link href="/location" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
              >
                Find UAE Charities
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/community" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="glass-hover px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-transparent w-full sm:w-auto"
              >
                Explore Communities
                <Users className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-12 sm:pt-16 max-w-5xl mx-auto px-4">
            <div className="glass rounded-2xl p-4 sm:p-6 text-center glass-hover">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">UAE Communities</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Connect with charity organizations across all seven emirates
              </p>
            </div>

            <div className="glass rounded-2xl p-4 sm:p-6 text-center glass-hover">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-chart-2/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-chart-2" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Interactive Map</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Discover opportunities from Dubai to Fujairah with real locations
              </p>
            </div>

            <div className="glass rounded-2xl p-4 sm:p-6 text-center glass-hover sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-chart-3/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-chart-3" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Local Impact</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Make a meaningful difference in your local UAE community
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

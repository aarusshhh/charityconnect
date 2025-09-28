import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Users } from "lucide-react"

export function CallToAction() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-chart-2/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass rounded-3xl p-8 md:p-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 text-sm mb-8">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Join thousands serving the UAE community</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Ready to serve your UAE community?</h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Connect with local UAE charities, discover meaningful volunteer opportunities across all emirates, and
              track your impact. Your journey to making a difference in the UAE starts here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="glass-hover px-8 py-4 text-lg bg-transparent">
                Browse UAE Communities
                <Users className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-2">Free Forever</div>
                <div className="text-muted-foreground">No hidden fees or charges</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">Verified Impact</div>
                <div className="text-muted-foreground">Track real-world results</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">UAE Focus</div>
                <div className="text-muted-foreground">Emirates-centered approach</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

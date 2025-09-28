import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Users } from "lucide-react"

export function CallToAction() {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-chart-2/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 sm:px-6 sm:py-3 text-sm mb-6 sm:mb-8">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Join thousands serving the UAE community</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance px-2">
              Ready to serve your UAE community?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty leading-relaxed px-4">
              Connect with local UAE charities, discover meaningful volunteer opportunities across all emirates, and
              track your impact. Your journey to making a difference in the UAE starts here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass-hover px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-transparent w-full sm:w-auto"
              >
                Browse UAE Communities
                <Users className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </div>

            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center px-4">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary mb-2">Free Forever</div>
                <div className="text-muted-foreground text-sm sm:text-base">No hidden fees or charges</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary mb-2">Verified Impact</div>
                <div className="text-muted-foreground text-sm sm:text-base">Track real-world results</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary mb-2">UAE Focus</div>
                <div className="text-muted-foreground text-sm sm:text-base">Emirates-centered approach</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

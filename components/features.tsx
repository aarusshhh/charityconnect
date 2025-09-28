import { Button } from "@/components/ui/button"
import { Users, Calendar, MapPin, Heart, Share2, Target } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "UAE Community Networks",
    description:
      "Connect with charity organizations across all seven emirates and build meaningful relationships with volunteers in Dubai, Abu Dhabi, Sharjah, and beyond.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Calendar,
    title: "Local Event Discovery",
    description:
      "Find upcoming charity events, Ramadan initiatives, National Day celebrations, and volunteer opportunities happening across the UAE.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: Target,
    title: "Skill Matching",
    description:
      "Get matched with volunteer opportunities that align with your skills, including Arabic language support, professional expertise, and cultural knowledge.",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: Share2,
    title: "Resource Sharing",
    description:
      "Share resources, knowledge, and support with other UAE community members and local organizations following Islamic values of giving.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: MapPin,
    title: "Emirates-Wide Coverage",
    description:
      "Discover opportunities from Dubai Marina to Fujairah mountains, with real GPS locations and distance-based matching across all emirates.",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    icon: Heart,
    title: "Impact Tracking",
    description:
      "Track your contributions to UAE society and see the real-world impact of your volunteer work in local communities and national initiatives.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Everything you need to serve the UAE community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Powerful tools and features designed to connect you with meaningful volunteer opportunities and charity work
            across the United Arab Emirates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass rounded-2xl p-8 glass-hover group">
              <div
                className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  )
}

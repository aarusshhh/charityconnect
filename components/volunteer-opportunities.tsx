"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  MapPin,
  Clock,
  Users,
  Heart,
  Calendar,
  Filter,
  Star,
  Briefcase,
  GraduationCap,
  Stethoscope,
  Hammer,
  Leaf,
} from "lucide-react"

interface Opportunity {
  id: number
  title: string
  organization: string
  type: string
  location: string
  duration: string
  commitment: string
  volunteers: number
  rating: number
  description: string
  skills: string[]
  urgency: "low" | "medium" | "high"
  remote: boolean
  date: string
  impact: string
  category: string
  emirate: string
}

const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Emergency Response Coordinator",
    organization: "Emirates Red Crescent",
    type: "Humanitarian Aid",
    location: "Dubai Healthcare City",
    duration: "6 months",
    commitment: "15 hrs/week",
    volunteers: 25,
    rating: 4.9,
    description:
      "Coordinate emergency response activities and manage volunteer teams during humanitarian crises. Perfect for experienced professionals.",
    skills: ["Emergency Management", "Leadership", "Arabic Language"],
    urgency: "high",
    remote: false,
    date: "2024-01-15",
    impact: "Support 1000+ families in crisis",
    category: "Humanitarian Aid",
    emirate: "Dubai",
  },
  {
    id: 2,
    title: "Education Program Volunteer",
    organization: "Dubai Cares",
    type: "Education",
    location: "DIFC, Dubai",
    duration: "1 year",
    commitment: "8 hrs/week",
    volunteers: 18,
    rating: 4.8,
    description:
      "Support education programs for underprivileged children globally. Help with program coordination and student mentoring.",
    skills: ["Teaching", "Program Management", "Cross-cultural Communication"],
    urgency: "medium",
    remote: true,
    date: "2024-01-20",
    impact: "Educate 500+ children worldwide",
    category: "Education",
    emirate: "Dubai",
  },
  {
    id: 3,
    title: "Medical Research Assistant",
    organization: "Al Jalila Foundation",
    type: "Healthcare",
    location: "Dubai Healthcare City",
    duration: "4 months",
    commitment: "12 hrs/week",
    volunteers: 8,
    rating: 4.9,
    description:
      "Assist with medical research projects focused on Arab world health challenges. Support data collection and analysis.",
    skills: ["Medical Knowledge", "Research", "Data Analysis"],
    urgency: "high",
    remote: false,
    date: "2024-01-10",
    impact: "Advance medical research for Arab world",
    category: "Healthcare",
    emirate: "Dubai",
  },
  {
    id: 4,
    title: "Community Outreach Volunteer",
    organization: "Beit Al Khair Society",
    type: "Social Welfare",
    location: "Al Qusais, Dubai",
    duration: "Ongoing",
    commitment: "6 hrs/week",
    volunteers: 35,
    rating: 4.7,
    description:
      "Engage with local communities to identify needs and connect families with social services and support programs.",
    skills: ["Community Engagement", "Arabic Language", "Social Work"],
    urgency: "medium",
    remote: false,
    date: "2024-01-12",
    impact: "Support 200+ families monthly",
    category: "Social Welfare",
    emirate: "Dubai",
  },
  {
    id: 5,
    title: "Environmental Education Coordinator",
    organization: "Emirates Environmental Group",
    type: "Environment",
    location: "Dubai Marina",
    duration: "3 months",
    commitment: "10 hrs/week",
    volunteers: 22,
    rating: 4.6,
    description: "Develop and deliver environmental education programs for schools and communities across the UAE.",
    skills: ["Environmental Science", "Education", "Public Speaking"],
    urgency: "low",
    remote: false,
    date: "2024-01-18",
    impact: "Educate 1000+ students on sustainability",
    category: "Environment",
    emirate: "Dubai",
  },
  {
    id: 6,
    title: "Disability Support Specialist",
    organization: "Zayed Higher Organization",
    type: "Disability Support",
    location: "Abu Dhabi",
    duration: "8 months",
    commitment: "12 hrs/week",
    volunteers: 15,
    rating: 4.8,
    description:
      "Provide specialized support and care for individuals with disabilities. Training and certification provided.",
    skills: ["Special Needs Care", "Patience", "Rehabilitation Support"],
    urgency: "high",
    remote: false,
    date: "2024-01-14",
    impact: "Support 100+ individuals with disabilities",
    category: "Disability Support",
    emirate: "Abu Dhabi",
  },
  {
    id: 7,
    title: "International Aid Coordinator",
    organization: "Sharjah Charity International",
    type: "International Aid",
    location: "Sharjah",
    duration: "1 year",
    commitment: "20 hrs/week",
    volunteers: 12,
    rating: 4.9,
    description:
      "Coordinate international humanitarian aid programs and manage logistics for refugee support initiatives.",
    skills: ["Project Management", "Logistics", "International Relations"],
    urgency: "high",
    remote: true,
    date: "2024-01-16",
    impact: "Aid 5000+ refugees globally",
    category: "International Aid",
    emirate: "Sharjah",
  },
  {
    id: 8,
    title: "Community Development Facilitator",
    organization: "Ajman Bank Foundation",
    type: "Community Development",
    location: "Ajman",
    duration: "6 months",
    commitment: "8 hrs/week",
    volunteers: 20,
    rating: 4.5,
    description:
      "Facilitate community development programs focused on financial literacy and entrepreneurship training.",
    skills: ["Financial Literacy", "Training", "Community Organizing"],
    urgency: "medium",
    remote: false,
    date: "2024-01-22",
    impact: "Train 300+ community members",
    category: "Community Development",
    emirate: "Ajman",
  },
]

const categoryIcons = {
  "Humanitarian Aid": Heart,
  Education: GraduationCap,
  Environment: Leaf,
  Healthcare: Stethoscope,
  "Social Welfare": Users,
  "Disability Support": Heart,
  "International Aid": Briefcase,
  "Community Development": Hammer,
}

const urgencyColors = {
  low: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  high: "bg-red-500/20 text-red-400 border-red-500/30",
}

const typeColors = {
  "Humanitarian Aid": "bg-red-500/20 text-red-400 border-red-500/30",
  Education: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Environment: "bg-green-500/20 text-green-400 border-green-500/30",
  Healthcare: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Social Welfare": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Disability Support": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "International Aid": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Community Development": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
}

export function VolunteerOpportunities() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterUrgency, setFilterUrgency] = useState<string>("all")
  const [filterRemote, setFilterRemote] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date")

  const filteredOpportunities = opportunities
    .filter((opp) => {
      const matchesSearch =
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        opp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.emirate.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = filterCategory === "all" || opp.category === filterCategory
      const matchesUrgency = filterUrgency === "all" || opp.urgency === filterUrgency
      const matchesRemote =
        filterRemote === "all" ||
        (filterRemote === "remote" && opp.remote) ||
        (filterRemote === "onsite" && !opp.remote)

      return matchesSearch && matchesCategory && matchesUrgency && matchesRemote
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "urgency":
          const urgencyOrder = { high: 3, medium: 2, low: 1 }
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency]
        case "volunteers":
          return a.volunteers - b.volunteers
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

  const categories = Array.from(new Set(opportunities.map((opp) => opp.category)))

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Find volunteer opportunities across the UAE
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Discover meaningful ways to contribute to UAE society. Filter by emirates, skills, and time commitment to
            find opportunities that match your passion for serving the community.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="mb-8 space-y-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search by title, organization, skills, emirate, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-hover"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="glass rounded-lg px-3 py-2 text-sm bg-transparent border border-border"
                >
                  <option value="date">Latest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="urgency">Most Urgent</option>
                  <option value="volunteers">Fewest Volunteers</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full glass rounded-lg px-3 py-2 text-sm bg-transparent border border-border"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Urgency</label>
                <select
                  value={filterUrgency}
                  onChange={(e) => setFilterUrgency(e.target.value)}
                  className="w-full glass rounded-lg px-3 py-2 text-sm bg-transparent border border-border"
                >
                  <option value="all">All Urgency</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <select
                  value={filterRemote}
                  onChange={(e) => setFilterRemote(e.target.value)}
                  className="w-full glass rounded-lg px-3 py-2 text-sm bg-transparent border border-border"
                >
                  <option value="all">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button className="w-full bg-primary hover:bg-primary/90">Apply Filters</Button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredOpportunities.length} of {opportunities.length} opportunities
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 3).map((category) => {
                  const Icon = categoryIcons[category as keyof typeof categoryIcons]
                  return (
                    <Badge
                      key={category}
                      variant="outline"
                      className={`cursor-pointer transition-all ${
                        filterCategory === category ? typeColors[category as keyof typeof typeColors] : "glass-hover"
                      }`}
                      onClick={() => setFilterCategory(filterCategory === category ? "all" : category)}
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {category}
                    </Badge>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOpportunities.map((opportunity) => {
              const Icon = categoryIcons[opportunity.category as keyof typeof categoryIcons]
              return (
                <Card key={opportunity.id} className="glass glass-hover border-border/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{opportunity.title}</CardTitle>
                        <p className="text-muted-foreground text-sm">{opportunity.organization}</p>
                        <p className="text-muted-foreground text-xs mt-1">{opportunity.emirate} Emirate</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={urgencyColors[opportunity.urgency]}>
                          {opportunity.urgency}
                        </Badge>
                        {opportunity.remote && (
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            Remote
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{opportunity.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{opportunity.commitment}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{opportunity.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{opportunity.volunteers} volunteers</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{opportunity.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        <span>{opportunity.impact}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-primary hover:bg-primary/90">Apply Now</Button>
                      <Button variant="outline" className="glass-hover bg-transparent">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No opportunities found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search criteria or filters</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setFilterCategory("all")
                  setFilterUrgency("all")
                  setFilterRemote("all")
                }}
                variant="outline"
                className="glass-hover bg-transparent"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

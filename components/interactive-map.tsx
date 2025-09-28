"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Users, Heart, Calendar, Filter, Navigation, Loader2 } from "lucide-react"

interface Organization {
  id: number
  name: string
  type: string
  volunteers: number
  lat: number
  lng: number
  impact: string
  description: string
  events: number
  urgency: "low" | "medium" | "high"
  skills: string[]
  city: string
  emirate: string
}

const organizations: Organization[] = [
  {
    id: 1,
    name: "Emirates Red Crescent",
    type: "Humanitarian Aid",
    volunteers: 1250,
    lat: 25.2048,
    lng: 55.2708,
    impact: "50k families supported",
    description:
      "Leading humanitarian organization providing aid and disaster relief across the UAE and internationally",
    events: 25,
    urgency: "high",
    skills: ["Emergency Response", "Community Outreach", "Medical Aid"],
    city: "Dubai",
    emirate: "Dubai",
  },
  {
    id: 2,
    name: "Dubai Cares",
    type: "Education",
    volunteers: 890,
    lat: 25.2285,
    lng: 55.275,
    impact: "2M children educated",
    description:
      "Improving access to quality education for children in developing countries through integrated programs",
    events: 18,
    urgency: "medium",
    skills: ["Teaching", "Program Management", "Child Development"],
    city: "Dubai",
    emirate: "Dubai",
  },
  {
    id: 3,
    name: "Al Jalila Foundation",
    type: "Healthcare",
    volunteers: 567,
    lat: 25.2697,
    lng: 55.3095,
    impact: "15k patients treated",
    description: "Advancing healthcare through medical education, research and treatment for Arab world",
    events: 12,
    urgency: "high",
    skills: ["Medical Research", "Healthcare", "Fundraising"],
    city: "Dubai",
    emirate: "Dubai",
  },
  {
    id: 4,
    name: "Beit Al Khair Society",
    type: "Social Welfare",
    volunteers: 734,
    lat: 25.2582,
    lng: 55.3047,
    impact: "25k families assisted",
    description: "Comprehensive social services including housing, healthcare, and education support",
    events: 22,
    urgency: "medium",
    skills: ["Social Work", "Community Support", "Case Management"],
    city: "Dubai",
    emirate: "Dubai",
  },
  {
    id: 5,
    name: "Emirates Environmental Group",
    type: "Environment",
    volunteers: 445,
    lat: 25.2144,
    lng: 55.2708,
    impact: "500k trees planted",
    description: "Environmental awareness and conservation initiatives across the UAE",
    events: 15,
    urgency: "medium",
    skills: ["Environmental Science", "Conservation", "Education"],
    city: "Dubai",
    emirate: "Dubai",
  },
  {
    id: 6,
    name: "Zayed Higher Organization",
    type: "Disability Support",
    volunteers: 312,
    lat: 24.4539,
    lng: 54.3773,
    impact: "8k individuals supported",
    description: "Comprehensive care and rehabilitation services for people with disabilities",
    events: 20,
    urgency: "high",
    skills: ["Special Needs Care", "Rehabilitation", "Therapy"],
    city: "Abu Dhabi",
    emirate: "Abu Dhabi",
  },
  {
    id: 7,
    name: "Sharjah Charity International",
    type: "International Aid",
    volunteers: 623,
    lat: 25.3463,
    lng: 55.4209,
    impact: "100k refugees aided",
    description: "International humanitarian aid and development programs across 50+ countries",
    events: 16,
    urgency: "high",
    skills: ["International Development", "Logistics", "Emergency Relief"],
    city: "Sharjah",
    emirate: "Sharjah",
  },
  {
    id: 8,
    name: "Ajman Bank Foundation",
    type: "Community Development",
    volunteers: 289,
    lat: 25.4052,
    lng: 55.5136,
    impact: "12k community members",
    description: "Supporting local community development through education and economic empowerment",
    events: 10,
    urgency: "low",
    skills: ["Community Development", "Financial Literacy", "Entrepreneurship"],
    city: "Ajman",
    emirate: "Ajman",
  },
]

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

const urgencyColors = {
  low: "bg-green-500/20 text-green-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-red-500/20 text-red-400",
}

export function InteractiveMap() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrg, setSelectedOrg] = useState<number | null>(null)
  const [filterType, setFilterType] = useState<string>("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)

  const getUserLocation = () => {
    setLocationLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(location)
          setLocationLoading(false)
          console.log("[v0] User location obtained:", location)
        },
        (error) => {
          console.log("[v0] Geolocation error:", error)
          setUserLocation({ lat: 25.2048, lng: 55.2708 })
          setLocationLoading(false)
        },
      )
    } else {
      setUserLocation({ lat: 25.2048, lng: 55.2708 })
      setLocationLoading(false)
    }
  }

  useEffect(() => {
    const initializeMap = async () => {
      if (typeof window !== "undefined" && mapRef.current && !mapInstance) {
        try {
          const L = (await import("leaflet")).default

          const map = L.map(mapRef.current).setView([25.2048, 55.2708], 8)

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
          }).addTo(map)

          organizations.forEach((org) => {
            const marker = L.marker([org.lat, org.lng])
              .addTo(map)
              .bindPopup(`
                <div class="p-2">
                  <h3 class="font-semibold text-sm">${org.name}</h3>
                  <p class="text-xs text-gray-600 mb-2">${org.city}, ${org.emirate}</p>
                  <p class="text-xs mb-2">${org.description}</p>
                  <div class="flex items-center justify-between text-xs">
                    <span>${org.volunteers} volunteers</span>
                    <span>${org.impact}</span>
                  </div>
                </div>
              `)

            marker.on("click", () => {
              setSelectedOrg(org.id)
            })
          })

          setMapInstance(map)
          console.log("[v0] Map initialized successfully")
        } catch (error) {
          console.log("[v0] Map initialization error:", error)
        }
      }
    }

    initializeMap()
  }, [mapInstance])

  useEffect(() => {
    if (mapInstance && userLocation) {
      const L = require("leaflet")
      L.marker([userLocation.lat, userLocation.lng]).addTo(mapInstance).bindPopup("Your Location").openPopup()

      mapInstance.setView([userLocation.lat, userLocation.lng], 12)
      console.log("[v0] Map updated with user location")
    }
  }, [mapInstance, userLocation])

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.emirate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter = filterType === "all" || org.type === filterType

    return matchesSearch && matchesFilter
  })

  const uniqueTypes = Array.from(new Set(organizations.map((org) => org.type)))

  const handleOrgClick = (org: Organization) => {
    setSelectedOrg(selectedOrg === org.id ? null : org.id)
    if (mapInstance) {
      mapInstance.setView([org.lat, org.lng], 15)
    }
  }

  return (
    <div className="w-full h-full">
      <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              placeholder="Search organizations, emirates, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 sm:pl-10 glass-hover text-sm sm:text-base"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="glass rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm bg-transparent border border-border flex-1 sm:flex-none"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {uniqueTypes.slice(0, 4).map((type) => (
            <Badge
              key={type}
              variant="outline"
              className={`cursor-pointer transition-all text-xs ${
                filterType === type ? typeColors[type as keyof typeof typeColors] : "glass-hover"
              }`}
              onClick={() => setFilterType(filterType === type ? "all" : type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 h-[500px] sm:h-[600px]">
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="glass rounded-2xl p-3 sm:p-6 h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-muted/10 via-transparent to-primary/5 rounded-2xl" />

            <div className="relative z-10 h-full">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold">UAE Charity Map</h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-hover bg-transparent text-xs sm:text-sm px-2 sm:px-3"
                    onClick={getUserLocation}
                    disabled={locationLoading}
                  >
                    {locationLoading ? (
                      <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin" />
                    ) : (
                      <Navigation className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    )}
                    <span className="hidden sm:inline">My Location</span>
                    <span className="sm:hidden">Location</span>
                  </Button>
                </div>
              </div>

              <div ref={mapRef} className="h-full rounded-xl overflow-hidden" style={{ minHeight: "300px" }} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2 space-y-3 sm:space-y-4 max-h-[300px] sm:max-h-[600px] overflow-y-auto">
          {filteredOrganizations.map((org) => (
            <div
              key={org.id}
              className={`glass rounded-xl p-3 sm:p-4 cursor-pointer transition-all duration-200 ${
                selectedOrg === org.id ? "ring-2 ring-primary scale-[1.02]" : "glass-hover"
              }`}
              onClick={() => handleOrgClick(org)}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm sm:text-base mb-1 truncate">{org.name}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className={`text-xs w-fit ${typeColors[org.type as keyof typeof typeColors]}`}
                    >
                      {org.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {org.city}, {org.emirate}
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className={`text-xs ml-2 ${urgencyColors[org.urgency]}`}>
                  {org.urgency}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground mb-2 sm:mb-3 leading-relaxed line-clamp-2">
                {org.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{org.volunteers}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{org.events}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span className="truncate max-w-20">{org.impact}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {org.skills.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs px-1.5 py-0">
                      {skill}
                    </Badge>
                  ))}
                  {org.skills.length > 2 && (
                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                      +{org.skills.length - 2}
                    </Badge>
                  )}
                </div>

                {selectedOrg === org.id && (
                  <div className="pt-2 sm:pt-3 border-t border-border space-y-2">
                    <Button size="sm" className="w-full text-xs">
                      Join Organization
                    </Button>
                    <Button size="sm" variant="outline" className="w-full text-xs glass-hover bg-transparent">
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredOrganizations.length === 0 && (
            <div className="glass rounded-xl p-6 sm:p-8 text-center">
              <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50" />
              <h3 className="font-semibold mb-2 text-sm sm:text-base">No organizations found</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
    </div>
  )
}

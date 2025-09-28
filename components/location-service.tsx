"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Loader2, AlertCircle, Users } from "lucide-react"

interface LocationData {
  latitude: number
  longitude: number
  city: string
  state: string
  country: string
}

interface NearbyOpportunity {
  id: number
  title: string
  organization: string
  distance: number
  type: string
  urgency: "low" | "medium" | "high"
  volunteers: number
}

const mockNearbyOpportunities: NearbyOpportunity[] = [
  {
    id: 1,
    title: "Food Distribution Helper",
    organization: "Local Food Bank",
    distance: 0.8,
    type: "Food Security",
    urgency: "high",
    volunteers: 12,
  },
  {
    id: 2,
    title: "Reading Tutor",
    organization: "Community Library",
    distance: 1.2,
    type: "Education",
    urgency: "medium",
    volunteers: 8,
  },
  {
    id: 3,
    title: "Park Cleanup Volunteer",
    organization: "Green Initiative",
    distance: 2.1,
    type: "Environment",
    urgency: "low",
    volunteers: 15,
  },
]

const urgencyColors = {
  low: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  high: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function LocationService() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nearbyOpportunities, setNearbyOpportunities] = useState<NearbyOpportunity[]>([])

  const getCurrentLocation = () => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const locationData: LocationData = {
            latitude,
            longitude,
            city: "New York",
            state: "NY",
            country: "USA",
          }

          setLocation(locationData)
          setNearbyOpportunities(mockNearbyOpportunities)
          setLoading(false)
        } catch (err) {
          setError("Failed to get location details")
          setLoading(false)
        }
      },
      (err) => {
        setError("Unable to retrieve your location")
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }

  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)}m away`
    }
    return `${distance.toFixed(1)} miles away`
  }

  return (
    <div className="space-y-6">
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Your Location</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!location && !loading && (
            <div className="text-center py-8">
              <Navigation className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="font-semibold mb-2">Enable Location Services</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Allow location access to find volunteer opportunities and charity events near you
              </p>
              <Button onClick={getCurrentLocation} className="bg-primary hover:bg-primary/90">
                <MapPin className="w-4 h-4 mr-2" />
                Get My Location
              </Button>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 text-primary mx-auto mb-4 animate-spin" />
              <p className="text-muted-foreground">Getting your location...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4 opacity-50" />
              <h3 className="font-semibold mb-2 text-destructive">Location Error</h3>
              <p className="text-muted-foreground text-sm mb-4">{error}</p>
              <Button onClick={getCurrentLocation} variant="outline" className="glass-hover bg-transparent">
                Try Again
              </Button>
            </div>
          )}

          {location && (
            <div className="space-y-4">
              <div className="glass rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Current Location</h4>
                    <p className="text-muted-foreground text-sm">
                      {location.city}, {location.state}, {location.country}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </p>
                  </div>
                  <Button
                    onClick={getCurrentLocation}
                    variant="outline"
                    size="sm"
                    className="glass-hover bg-transparent"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Update
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="glass rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">{nearbyOpportunities.length}</div>
                  <div className="text-xs text-muted-foreground">Nearby Opportunities</div>
                </div>
                <div className="glass rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {nearbyOpportunities.reduce((sum, opp) => sum + opp.volunteers, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Active Volunteers</div>
                </div>
                <div className="glass rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {nearbyOpportunities.filter((opp) => opp.urgency === "high").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Urgent Needs</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {nearbyOpportunities.length > 0 && (
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Opportunities Near You</span>
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                {nearbyOpportunities.length} found
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="glass rounded-lg p-4 glass-hover">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{opportunity.title}</h4>
                      <p className="text-muted-foreground text-xs">{opportunity.organization}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={urgencyColors[opportunity.urgency]}>
                        {opportunity.urgency}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{formatDistance(opportunity.distance)}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{opportunity.volunteers} volunteers</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {opportunity.type}
                      </Badge>
                    </div>
                    <Button size="sm" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline" className="glass-hover bg-transparent">
                View All Nearby Opportunities
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

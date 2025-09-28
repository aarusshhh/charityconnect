"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Users,
  Calendar,
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  Star,
  Clock,
  ArrowRight,
  Plus,
} from "lucide-react"

interface Community {
  id: number
  name: string
  description: string
  members: number
  category: string
  location: string
  image: string
  rating: number
  events: number
  posts: number
  isJoined: boolean
}

interface Event {
  id: number
  title: string
  community: string
  date: string
  time: string
  location: string
  attendees: number
  maxAttendees: number
  description: string
  category: string
  isRegistered: boolean
}

interface Post {
  id: number
  author: string
  avatar: string
  community: string
  content: string
  timestamp: string
  likes: number
  comments: number
  isLiked: boolean
}

const communities: Community[] = [
  {
    id: 1,
    name: "Downtown Food Heroes",
    description: "Fighting hunger in our community through food distribution and education programs.",
    members: 245,
    category: "Food Security",
    location: "Downtown NYC",
    image: "/food-bank-volunteers.png",
    rating: 4.8,
    events: 12,
    posts: 89,
    isJoined: false,
  },
  {
    id: 2,
    name: "Future Builders Education",
    description: "Empowering youth through mentorship, tutoring, and skill development programs.",
    members: 189,
    category: "Education",
    location: "Brooklyn, NY",
    image: "/placeholder-1kxbb.png",
    rating: 4.9,
    events: 18,
    posts: 156,
    isJoined: true,
  },
  {
    id: 3,
    name: "Green City Collective",
    description: "Creating sustainable communities through environmental action and education.",
    members: 312,
    category: "Environment",
    location: "Queens, NY",
    image: "/community-garden-volunteers.png",
    rating: 4.7,
    events: 8,
    posts: 203,
    isJoined: false,
  },
  {
    id: 4,
    name: "Senior Care Circle",
    description: "Providing companionship and support services for elderly community members.",
    members: 156,
    category: "Healthcare",
    location: "Manhattan, NY",
    image: "/senior-care-volunteers.jpg",
    rating: 4.9,
    events: 15,
    posts: 78,
    isJoined: true,
  },
]

const events: Event[] = [
  {
    id: 1,
    title: "Community Food Drive",
    community: "Downtown Food Heroes",
    date: "2024-01-20",
    time: "9:00 AM",
    location: "Community Center, Downtown",
    attendees: 45,
    maxAttendees: 60,
    description: "Help us collect and distribute food to families in need. Volunteers needed for sorting and packing.",
    category: "Food Security",
    isRegistered: false,
  },
  {
    id: 2,
    title: "Youth Coding Workshop",
    community: "Future Builders Education",
    date: "2024-01-22",
    time: "2:00 PM",
    location: "Brooklyn Library",
    attendees: 28,
    maxAttendees: 30,
    description:
      "Teach basic programming concepts to local youth. Perfect for tech professionals looking to give back.",
    category: "Education",
    isRegistered: true,
  },
  {
    id: 3,
    title: "Park Cleanup Day",
    community: "Green City Collective",
    date: "2024-01-25",
    time: "10:00 AM",
    location: "Central Park",
    attendees: 67,
    maxAttendees: 80,
    description: "Join us for a community park cleanup and tree planting event. All supplies provided.",
    category: "Environment",
    isRegistered: false,
  },
  {
    id: 4,
    title: "Senior Game Night",
    community: "Senior Care Circle",
    date: "2024-01-18",
    time: "6:00 PM",
    location: "Senior Center",
    attendees: 22,
    maxAttendees: 25,
    description: "Spend an evening playing games and socializing with senior community members.",
    category: "Healthcare",
    isRegistered: true,
  },
]

const posts: Post[] = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "/woman-volunteer.jpg",
    community: "Future Builders Education",
    content:
      "Amazing turnout at today's coding workshop! 25 kids learned their first Python program. The joy on their faces when their code worked was priceless. Thank you to all the volunteer mentors who made this possible! 🎉",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: 2,
    author: "Mike Rodriguez",
    avatar: "/man-volunteer.jpg",
    community: "Downtown Food Heroes",
    content:
      "We distributed over 500 meals this week! Our food bank is making a real difference in the community. Special thanks to the new volunteers who joined us - your energy and dedication is inspiring.",
    timestamp: "5 hours ago",
    likes: 31,
    comments: 12,
    isLiked: true,
  },
  {
    id: 3,
    author: "Emma Thompson",
    avatar: "/woman-environmentalist.jpg",
    community: "Green City Collective",
    content:
      "Our community garden is thriving! We've harvested over 200 pounds of fresh vegetables this month, all donated to local food banks. Nature has a way of bringing people together. 🌱",
    timestamp: "1 day ago",
    likes: 18,
    comments: 5,
    isLiked: false,
  },
]

const categoryColors = {
  "Food Security": "bg-red-500/20 text-red-400 border-red-500/30",
  Education: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Environment: "bg-green-500/20 text-green-400 border-green-500/30",
  Healthcare: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Housing: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Animal Welfare": "bg-pink-500/20 text-pink-400 border-pink-500/30",
}

export function CommunityHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("communities")

  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.community.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.community.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-balance px-2">
            Connect with your community
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-pretty px-4">
            Join local charity communities, discover upcoming events, and share your impact with like-minded
            individuals.
          </p>
        </div>

        <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12">
          <div className="mb-6 sm:mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
              <Input
                placeholder="Search communities, events, or posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 sm:pl-10 glass-hover text-sm sm:text-base"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass mb-6 sm:mb-8">
              <TabsTrigger value="communities" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Communities</span>
                <span className="sm:hidden">Groups</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Events</span>
              </TabsTrigger>
              <TabsTrigger value="feed" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Feed</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="communities" className="mt-6 sm:mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {filteredCommunities.map((community) => (
                  <Card key={community.id} className="glass glass-hover border-border/50 overflow-hidden">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={community.image || "/placeholder.svg"}
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <Badge
                          variant="outline"
                          className={`text-xs ${categoryColors[community.category as keyof typeof categoryColors]}`}
                        >
                          {community.category}
                        </Badge>
                      </div>
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <div className="flex items-center space-x-1 glass rounded-full px-2 py-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium">{community.rating}</span>
                        </div>
                      </div>
                    </div>

                    <CardHeader className="p-3 sm:p-6">
                      <CardTitle className="flex items-start justify-between text-base sm:text-lg">
                        <span className="line-clamp-2 pr-2">{community.name}</span>
                        {community.isJoined && (
                          <Badge
                            variant="outline"
                            className="bg-green-500/20 text-green-400 border-green-500/30 text-xs flex-shrink-0"
                          >
                            Joined
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {community.description}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0">
                      <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                        <div>
                          <div className="text-base sm:text-lg font-semibold text-primary">{community.members}</div>
                          <div className="text-xs text-muted-foreground">Members</div>
                        </div>
                        <div>
                          <div className="text-base sm:text-lg font-semibold text-primary">{community.events}</div>
                          <div className="text-xs text-muted-foreground">Events</div>
                        </div>
                        <div>
                          <div className="text-base sm:text-lg font-semibold text-primary">{community.posts}</div>
                          <div className="text-xs text-muted-foreground">Posts</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{community.location}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className={`flex-1 text-xs sm:text-sm ${community.isJoined ? "bg-muted hover:bg-muted/80" : "bg-primary hover:bg-primary/90"}`}
                        >
                          {community.isJoined ? "View Community" : "Join Community"}
                        </Button>
                        <Button variant="outline" className="glass-hover bg-transparent px-3">
                          <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredCommunities.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <Users className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">No communities found</h3>
                  <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                    Try adjusting your search terms
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Community
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="events" className="mt-6 sm:mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="glass glass-hover border-border/50">
                    <CardHeader className="p-3 sm:p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base sm:text-lg mb-2 line-clamp-2">{event.title}</CardTitle>
                          <p className="text-muted-foreground text-sm truncate">{event.community}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ml-2 flex-shrink-0 ${categoryColors[event.category as keyof typeof categoryColors]}`}
                        >
                          {event.category}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{event.description}</p>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                          <span>
                            {event.attendees}/{event.maxAttendees}
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className={`flex-1 text-xs sm:text-sm ${event.isRegistered ? "bg-muted hover:bg-muted/80" : "bg-primary hover:bg-primary/90"}`}
                        >
                          {event.isRegistered ? "Registered" : "Register"}
                          {!event.isRegistered && <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />}
                        </Button>
                        <Button variant="outline" className="glass-hover bg-transparent px-3">
                          <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">No events found</h3>
                  <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                    Try adjusting your search terms
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="feed" className="mt-6 sm:mt-8">
              <div className="space-y-4 sm:space-y-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="glass glass-hover border-border/50">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                          <AvatarFallback className="text-xs sm:text-sm">
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="min-w-0">
                              <h4 className="font-semibold text-sm sm:text-base truncate">{post.author}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                {post.community} • {post.timestamp}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm leading-relaxed">{post.content}</p>

                          <div className="flex items-center space-x-4 sm:space-x-6 pt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`flex items-center space-x-2 text-xs sm:text-sm px-2 ${post.isLiked ? "text-red-400" : "text-muted-foreground"}`}
                            >
                              <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${post.isLiked ? "fill-current" : ""}`} />
                              <span>{post.likes}</span>
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-2 text-muted-foreground text-xs sm:text-sm px-2"
                            >
                              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{post.comments}</span>
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-2 text-muted-foreground text-xs sm:text-sm px-2"
                            >
                              <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Share</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">No posts found</h3>
                  <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                    Try adjusting your search terms
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

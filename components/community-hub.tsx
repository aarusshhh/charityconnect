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
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Connect with your community</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Join local charity communities, discover upcoming events, and share your impact with like-minded
            individuals.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search communities, events, or posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-hover"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass">
              <TabsTrigger value="communities" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Communities</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </TabsTrigger>
              <TabsTrigger value="feed" className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Community Feed</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="communities" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCommunities.map((community) => (
                  <Card key={community.id} className="glass glass-hover border-border/50 overflow-hidden">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={community.image || "/placeholder.svg"}
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="outline"
                          className={categoryColors[community.category as keyof typeof categoryColors]}
                        >
                          {community.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center space-x-1 glass rounded-full px-2 py-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium">{community.rating}</span>
                        </div>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{community.name}</span>
                        {community.isJoined && (
                          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                            Joined
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm leading-relaxed">{community.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-semibold text-primary">{community.members}</div>
                          <div className="text-xs text-muted-foreground">Members</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-primary">{community.events}</div>
                          <div className="text-xs text-muted-foreground">Events</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-primary">{community.posts}</div>
                          <div className="text-xs text-muted-foreground">Posts</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{community.location}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className={`flex-1 ${community.isJoined ? "bg-muted hover:bg-muted/80" : "bg-primary hover:bg-primary/90"}`}
                        >
                          {community.isJoined ? "View Community" : "Join Community"}
                        </Button>
                        <Button variant="outline" className="glass-hover bg-transparent">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredCommunities.length === 0 && (
                <div className="text-center py-16">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No communities found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search terms</p>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Community
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="events" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="glass glass-hover border-border/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                          <p className="text-muted-foreground text-sm">{event.community}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={categoryColors[event.category as keyof typeof categoryColors]}
                        >
                          {event.category}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
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
                          className={`flex-1 ${event.isRegistered ? "bg-muted hover:bg-muted/80" : "bg-primary hover:bg-primary/90"}`}
                        >
                          {event.isRegistered ? "Registered" : "Register"}
                          {!event.isRegistered && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                        <Button variant="outline" className="glass-hover bg-transparent">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-16">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search terms</p>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="feed" className="mt-8">
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="glass glass-hover border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                          <AvatarFallback>
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{post.author}</h4>
                              <p className="text-sm text-muted-foreground">
                                {post.community} • {post.timestamp}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm leading-relaxed">{post.content}</p>

                          <div className="flex items-center space-x-6 pt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`flex items-center space-x-2 ${post.isLiked ? "text-red-400" : "text-muted-foreground"}`}
                            >
                              <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                              <span>{post.likes}</span>
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-2 text-muted-foreground"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-2 text-muted-foreground"
                            >
                              <Share2 className="w-4 h-4" />
                              <span>Share</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search terms</p>
                  <Button className="bg-primary hover:bg-primary/90">
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

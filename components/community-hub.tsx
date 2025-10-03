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
    name: "Emirates Red Crescent",
    description: "Leading humanitarian organization providing aid and disaster relief across the UAE and internationally.",
    members: 1250,
    category: "Humanitarian Aid",
    location: "Dubai, UAE",
    image: "/food-bank-volunteers.png",
    rating: 4.9,
    events: 25,
    posts: 189,
    isJoined: false,
  },
  {
    id: 2,
    name: "Dubai Cares",
    description: "Improving access to quality education for children in developing countries through integrated programs.",
    members: 890,
    category: "Education",
    location: "Dubai, UAE",
    image: "/placeholder-1kxbb.png",
    rating: 4.8,
    events: 18,
    posts: 156,
    isJoined: true,
  },
  {
    id: 3,
    name: "Emirates Environmental Group",
    description: "Environmental awareness and conservation initiatives across the UAE for a sustainable future.",
    members: 445,
    category: "Environment",
    location: "Dubai, UAE",
    image: "/community-garden-volunteers.png",
    rating: 4.7,
    events: 15,
    posts: 203,
    isJoined: false,
  },
  {
    id: 4,
    name: "Al Jalila Foundation",
    description: "Advancing healthcare through medical education, research and treatment for the Arab world.",
    members: 567,
    category: "Healthcare",
    location: "Dubai, UAE",
    image: "/senior-care-volunteers.jpg",
    rating: 4.9,
    events: 12,
    posts: 134,
    isJoined: true,
  },
  {
    id: 5,
    name: "Beit Al Khair Society",
    description: "Comprehensive social services including housing, healthcare, and education support for families in need.",
    members: 734,
    category: "Social Welfare",
    location: "Dubai, UAE",
    image: "/food-bank-volunteers.png",
    rating: 4.8,
    events: 22,
    posts: 198,
    isJoined: false,
  },
  {
    id: 6,
    name: "Zayed Higher Organization",
    description: "Comprehensive care and rehabilitation services for people with disabilities across the UAE.",
    members: 312,
    category: "Disability Support",
    location: "Abu Dhabi, UAE",
    image: "/senior-care-volunteers.jpg",
    rating: 4.9,
    events: 20,
    posts: 156,
    isJoined: false,
  },
]

const events: Event[] = [
  {
    id: 1,
    title: "Ramadan Food Distribution",
    community: "Emirates Red Crescent",
    date: "2024-03-15",
    time: "8:00 AM",
    location: "Dubai Community Center",
    attendees: 85,
    maxAttendees: 100,
    description: "Join us in distributing food packages to families in need during Ramadan. Volunteers needed for packing and delivery.",
    category: "Humanitarian Aid",
    isRegistered: false,
  },
  {
    id: 2,
    title: "Youth Mentorship Program",
    community: "Dubai Cares",
    date: "2024-03-18",
    time: "3:00 PM",
    location: "Dubai Knowledge Park",
    attendees: 45,
    maxAttendees: 50,
    description: "Mentor students from developing countries studying in the UAE. Share your expertise and inspire future leaders.",
    category: "Education",
    isRegistered: true,
  },
  {
    id: 3,
    title: "Beach Cleanup Initiative",
    community: "Emirates Environmental Group",
    date: "2024-03-20",
    time: "7:00 AM",
    location: "Jumeirah Beach",
    attendees: 120,
    maxAttendees: 150,
    description: "Help keep our beaches clean. Join us for a morning beach cleanup with refreshments provided.",
    category: "Environment",
    isRegistered: false,
  },
  {
    id: 4,
    title: "Medical Research Fundraiser",
    community: "Al Jalila Foundation",
    date: "2024-03-22",
    time: "6:00 PM",
    location: "Burj Khalifa Area",
    attendees: 180,
    maxAttendees: 200,
    description: "Annual fundraising gala to support medical research and treatment programs across the region.",
    category: "Healthcare",
    isRegistered: true,
  },
]

const posts: Post[] = [
  {
    id: 1,
    author: "Fatima Al Mansoori",
    avatar: "/woman-volunteer.jpg",
    community: "Dubai Cares",
    content: "Incredible experience mentoring 30 students today at our education workshop. Seeing their enthusiasm for learning reminds us why we do this work. Thank you to all volunteers who joined us!",
    timestamp: "3 hours ago",
    likes: 42,
    comments: 12,
    isLiked: false,
  },
  {
    id: 2,
    author: "Ahmed Hassan",
    avatar: "/man-volunteer.jpg",
    community: "Emirates Red Crescent",
    content: "This week we supported over 800 families across the UAE. The generosity of our community never ceases to amaze me. Together we're making a real difference.",
    timestamp: "6 hours ago",
    likes: 67,
    comments: 18,
    isLiked: true,
  },
  {
    id: 3,
    author: "Maryam Khalid",
    avatar: "/woman-environmentalist.jpg",
    community: "Emirates Environmental Group",
    content: "Our tree planting initiative reached 5,000 trees this month! Working together to create a greener, more sustainable UAE for future generations.",
    timestamp: "1 day ago",
    likes: 38,
    comments: 9,
    isLiked: false,
  },
]

const categoryColors = {
  "Humanitarian Aid": "bg-red-500/20 text-red-400 border-red-500/30",
  Education: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Environment: "bg-green-500/20 text-green-400 border-green-500/30",
  Healthcare: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Social Welfare": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Disability Support": "bg-pink-500/20 text-pink-400 border-pink-500/30",
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
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-40 right-1/4 w-60 h-60 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Connect with{" "}
            <span className="relative inline-block group cursor-default">
              <span className="relative z-10 text-white transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] drop-shadow-[0_0_15px_rgba(22,163,74,0.4)] drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] drop-shadow-[0_0_35px_rgba(220,38,38,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(22,163,74,0.7)] group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_50px_rgba(220,38,38,0.6)]">
                UAE
              </span>
            </span>{" "}
            communities
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Join charity organizations across the Emirates, discover volunteer opportunities, and share your impact with like-minded individuals.
          </p>
        </div>

        <div className="glass rounded-3xl p-4 sm:p-8 md:p-12 border border-purple-500/20 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5">
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search communities, events, or posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-hover border-purple-500/20"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass border-purple-500/20">
              <TabsTrigger value="communities" className="flex items-center justify-center space-x-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Communities</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center justify-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Events</span>
              </TabsTrigger>
              <TabsTrigger value="feed" className="flex items-center justify-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Feed</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="communities" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCommunities.map((community) => (
                  <Card key={community.id} className="glass glass-hover border-purple-500/20 overflow-hidden bg-gradient-to-br from-purple-500/5 to-blue-500/5">
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
                        <div className="flex items-center space-x-1 glass rounded-full px-2 py-1 border border-purple-500/20">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium">{community.rating}</span>
                        </div>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-white drop-shadow-[0_0_8px_rgba(147,51,234,0.3)]">
                        <span className="text-base sm:text-lg">{community.name}</span>
                        {community.isJoined && (
                          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            Joined
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm leading-relaxed">{community.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-semibold text-white drop-shadow-[0_0_8px_rgba(147,51,234,0.3)]">{community.members}</div>
                          <div className="text-xs text-muted-foreground">Members</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-white drop-shadow-[0_0_8px_rgba(147,51,234,0.3)]">{community.events}</div>
                          <div className="text-xs text-muted-foreground">Events</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-white drop-shadow-[0_0_8px_rgba(147,51,234,0.3)]">{community.posts}</div>
                          <div className="text-xs text-muted-foreground">Posts</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{community.location}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className={`flex-1 text-sm ${community.isJoined ? "bg-muted hover:bg-muted/80" : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"}`}
                        >
                          {community.isJoined ? "View Community" : "Join Community"}
                        </Button>
                        <Button variant="outline" className="glass-hover bg-transparent border-purple-500/30">
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
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Community
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="events" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="glass glass-hover border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-base sm:text-lg mb-2 text-white drop-shadow-[0_0_8px_rgba(147,51,234,0.3)]">{event.title}</CardTitle>
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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

                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className={`flex-1 text-sm ${event.isRegistered ? "bg-muted hover:bg-muted/80" : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"}`}
                        >
                          {event.isRegistered ? "Registered" : "Register"}
                          {!event.isRegistered && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                        <Button variant="outline" className="glass-hover bg-transparent border-purple-500/30">
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
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="feed" className="mt-8">
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="glass glass-hover border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                          <AvatarFallback>
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-3 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <div>
                              <h4 className="font-semibold text-white drop-shadow-[0_0_8px_rgba(147,51,234,0.3)] text-sm sm:text-base">{post.author}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                {post.community} • {post.timestamp}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm leading-relaxed break-words">{post.content}</p>

                          <div className="flex items-center flex-wrap gap-4 sm:gap-6 pt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`flex items-center space-x-2 h-8 px-2 ${post.isLiked ? "text-red-400" : "text-muted-foreground"}`}
                            >
                              <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                              <span className="text-xs sm:text-sm">{post.likes}</span>
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-2 text-muted-foreground h-8 px-2"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-xs sm:text-sm">{post.comments}</span>
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-2 text-muted-foreground h-8 px-2"
                            >
                              <Share2 className="w-4 h-4" />
                              <span className="text-xs sm:text-sm hidden sm:inline">Share</span>
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
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
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

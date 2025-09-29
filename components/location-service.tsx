"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AwardIcon } from "lucide-react"

interface LeaderboardEntry {
  id: number
  school: string
  score: number
  rank: number
}

const mockLeaderboard: LeaderboardEntry[] = [
  { id: 1, school: "Green Valley High", score: 980, rank: 1 },
  { id: 2, school: "Riverdale Academy", score: 870, rank: 2 },
  { id: 3, school: "Sunrise School", score: 820, rank: 3 },
  { id: 4, school: "Horizon Institute", score: 760, rank: 4 },
  { id: 5, school: "Oakwood College", score: 710, rank: 5 },
]

export function LocationService() {
  const [leaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard)

  return (
    <div className="space-y-6">
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AwardIcon className="w-5 h-5 text-primary" />
            <span>Current Leaderboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div
                key={entry.id}
                className="glass rounded-lg p-4 flex items-center justify-between glass-hover"
              >
                <div className="flex items-center space-x-4">
                  <Badge
                    variant="outline"
                    className={`${
                      entry.rank === 1
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : entry.rank === 2
                        ? "bg-gray-400/20 text-gray-300 border-gray-400/30"
                        : entry.rank === 3
                        ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                        : "bg-primary/20 text-primary border-primary/30"
                    }`}
                  >
                    #{entry.rank}
                  </Badge>
                  <span className="font-semibold">{entry.school}</span>
                </div>
                <div className="font-bold text-primary">{entry.score}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

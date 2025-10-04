import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, Heart, Users, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [wordsRevealed, setWordsRevealed] = useState<number[]>([])
  const headingWords = ["Make", "a", "difference", "in", "the", "UAE", "community"]

  useEffect(() => {
    headingWords.forEach((_, index) => {
      setTimeout(() => {
        setWordsRevealed(prev => [...prev, index])
      }, index * 400)
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      <style>{`
        @keyframes glowReveal {
          0% {
            opacity: 0;
            filter: blur(15px);
            text-shadow: 
              0 0 50px white,
              0 0 100px white,
              0 0 150px rgba(147,51,234,0.9),
              0 0 200px rgba(59,130,246,0.7);
          }
          50% {
            opacity: 1;
            filter: blur(8px);
            text-shadow: 
              0 0 40px white,
              0 0 80px rgba(147,51,234,0.8),
              0 0 120px rgba(59,130,246,0.6);
          }
          92% {
            opacity: 1;
            filter: blur(0px);
            text-shadow: 
              0 0 15px rgba(147,51,234,0.4),
              0 0 25px rgba(59,130,246,0.3),
              0 0 35px rgba(6,182,212,0.2);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            text-shadow: none;
          }
        }
        .glow-word {
          display: inline-block;
          opacity: 0;
        }
        .glow-word.reveal {
          animation: glowReveal 1.8s ease-out forwards;
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10" />
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-40 right-1/4 w-60 h-60 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 text-sm border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <Heart className="w-4 h-4 text-pink-500" />
            <span className="text-foreground font-medium">Connecting communities across the UAE</span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl text-balance leading-tight font-bold tracking-tight">
            {headingWords.map((word, index) => (
              <span key={index}>
                {index === 5 ? (
                  <span className="relative inline-block group cursor-default">
                    <span className={`glow-word relative z-10 text-white transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] drop-shadow-[0_0_15px_rgba(147,51,234,0.4)] drop-shadow-[0_0_25px_rgba(59,130,246,0.3)] drop-shadow-[0_0_35px_rgba(6,182,212,0.2)] group-hover:drop-shadow-[0_0_30px_rgba(147,51,234,0.7)] group-hover:drop-shadow-[0_0_40px_rgba(59,130,246,0.6)] group-hover:drop-shadow-[0_0_50px_rgba(6,182,212,0.4)] ${wordsRevealed.includes(index) ? 'reveal' : ''}`}>
                      {word}
                    </span>
                  </span>
                ) : (
                  <span className={`glow-word ${wordsRevealed.includes(index) ? 'reveal' : ''}`}>
                    {word}
                  </span>
                )}
                {index < headingWords.length - 1 && " "}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed tracking-tight">
            CharityConnect UAE connects you with local charity organizations across all seven emirates. Discover
            volunteer opportunities, join community initiatives, and make a real impact in your neighborhood.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/location">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-lg shadow-purple-500/30"
              >
                School Rankings
                <Trophy className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/community">
              <Button 
                size="lg" 
                variant="outline" 
                className="glass-hover px-8 py-4 text-lg bg-transparent border-purple-500/30 hover:border-purple-500/50 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10"
              >
                Explore Communities
                <Users className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

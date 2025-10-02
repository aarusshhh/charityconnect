"use client"

import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { ImpactStats } from "@/components/impact-stats"
import { CommunityMap } from "@/components/community-map"
import { CallToAction } from "@/components/call-to-action"
import { Navigation } from "@/components/navigation"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mb-20"
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <RevealOnScroll>
        <Hero />
      </RevealOnScroll>

      <RevealOnScroll>
        <ImpactStats />
      </RevealOnScroll>

      <RevealOnScroll>
        <Features />
      </RevealOnScroll>

      <RevealOnScroll>
        <CommunityMap />
      </RevealOnScroll>

      <RevealOnScroll>
        <CallToAction />
      </RevealOnScroll>
    </main>
  )
}

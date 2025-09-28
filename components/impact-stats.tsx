"use client"

import { useEffect, useState } from "react"

const stats = [
  { value: 485000, label: "UAE residents helped", suffix: "" },
  { value: 125000, label: "volunteer hours", suffix: "" },
  { value: 7, label: "emirates covered", suffix: "" },
]

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(Math.floor(value * easeOutQuart))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span>{displayValue.toLocaleString()}</span>
}

export function ImpactStats() {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-balance px-2">
              Real Impact Across the UAE
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-pretty px-4">
              See the tangible difference our community is making across all seven emirates of the UAE
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                  <AnimatedNumber value={stat.value} duration={2000 + index * 200} />
                  {stat.suffix}
                </div>
                <div className="text-muted-foreground text-base sm:text-lg capitalize">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useState } from 'react'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const departDate = new Date('2026-02-18T12:00:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = departDate - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
      {[
        { label: 'Jours', value: timeLeft.days },
        { label: 'Heures', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Secondes', value: timeLeft.seconds },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6"
        >
          <div className="text-4xl font-archivo font-black text-[#f88b29] leading-none mb-2">
            {item.value}
          </div>
          <div className="text-xs uppercase tracking-wider opacity-80">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}

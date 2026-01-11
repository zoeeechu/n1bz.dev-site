'use client'

import { useEffect, useRef } from 'react'

const SYMBOLS = ['@', '#', '$', '%', '&', '*', '+', '?']

type Slot = {
  index: number
  symbolIndex: number
  char: string
  state: 'hidden' | 'rolling' | 'final'
  startTime: number
}

export default function RollingRevealText({
  children,
  stepDelay = 80,     // delay between letters
  rollSpeed = 50,     // symbol cycle speed
  fadeDuration = 120 // fade into final letter
}: {
  children: string
  stepDelay?: number
  rollSpeed?: number
  fadeDuration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const slots = useRef<Slot[]>([])
  const startTime = useRef(0)

  useEffect(() => {
    if (!ref.current) return

    const text = children
    startTime.current = performance.now()

    // Initialize slots as fully invisible
    slots.current = text.split('').map((char, i) => ({
      index: i,
      symbolIndex: 0,
      char,
      state: 'hidden',
      startTime: startTime.current + i * stepDelay,
    }))

    // Initial invisible render (critical for no flash)
    ref.current.innerHTML = text
      .split('')
      .map(() => `<span style="opacity:0"> </span>`)
      .join('')

    let raf: number

    const render = (time: number) => {
      if (!ref.current) return

      const html = slots.current
        .map(slot => {
          if (slot.state === 'hidden') {
            if (time >= slot.startTime) {
              slot.state = 'rolling'
              slot.symbolIndex = 0
              slot.startTime = time
            }
            return `<span style="opacity:0"> </span>`
          }

          if (slot.state === 'rolling') {
            const cycles = Math.floor(
              (time - slot.startTime) / rollSpeed
            )

            if (cycles >= SYMBOLS.length) {
              slot.state = 'final'
              slot.startTime = time
              return `<span style="
                opacity:0;
                transition:opacity ${fadeDuration}ms linear
              ">${slot.char}</span>`
            }

            const symbol = SYMBOLS[cycles]
            return `<span style="opacity:1">${symbol}</span>`
          }

          // final fade-in
          const t = Math.min(
            (time - slot.startTime) / fadeDuration,
            1
          )

          return `<span style="opacity:${t}">${slot.char}</span>`
        })
        .join('')

      ref.current.innerHTML = html
    }

    const loop = (time: number) => {
      render(time)
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [children, stepDelay, rollSpeed, fadeDuration])

  return (
    <span
      ref={ref}
      aria-label={children}
      style={{
        display: 'inline-block',
        whiteSpace: 'pre',
      }}
    />
  )
}

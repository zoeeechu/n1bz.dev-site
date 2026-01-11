'use client'

import { useEffect, useRef } from 'react'

const CENSOR_CHARS = ['@', '*', '%', '#', '!', '?', '&', '$']

type Slot = {
  char: string
  nextChar: string
  nextTime: number
  fadeStart: number
  fading: boolean
}

function randomChar(exclude?: string) {
  let c: string
  do {
    c = CENSOR_CHARS[Math.floor(Math.random() * CENSOR_CHARS.length)]
  } while (c === exclude)
  return c
}

export default function CensorText({
  children,
  minSpeed = 140,
  maxSpeed = 420,
  fadeDuration = 120,
}: {
  children: string
  minSpeed?: number
  maxSpeed?: number
  fadeDuration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const slots = useRef<Slot[]>([])

  useEffect(() => {
    if (!ref.current || children.length < 3) return

    const middleLen = children.length - 2
    const start = performance.now()

    // initialize slots
    slots.current = Array.from({ length: middleLen }, (_, i) => ({
      char: CENSOR_CHARS[i % CENSOR_CHARS.length],
      nextChar: '',
      nextTime:
        start + minSpeed + Math.random() * (maxSpeed - minSpeed),
      fadeStart: 0,
      fading: false,
    }))

    let raf: number

    const render = (time: number) => {
      if (!ref.current) return

      const mid = slots.current
        .map(slot => {
          if (!slot.fading) return slot.char

          const t = Math.min(
            (time - slot.fadeStart) / fadeDuration,
            1
          )

          return `<span style="
            opacity:${t};
            transition:opacity ${fadeDuration}ms linear
          ">${slot.nextChar}</span>`
        })
        .join('')

      ref.current.innerHTML =
        children[0] + mid + children[children.length - 1]
    }

    const loop = (time: number) => {
      let needsRender = false

      for (const slot of slots.current) {
        if (!slot.fading && time >= slot.nextTime) {
          slot.fading = true
          slot.fadeStart = time
          slot.nextChar = randomChar(slot.char)
          needsRender = true
        }

        if (slot.fading && time - slot.fadeStart >= fadeDuration) {
          slot.char = slot.nextChar
          slot.fading = false
          slot.nextTime =
            time + minSpeed + Math.random() * (maxSpeed - minSpeed)
          needsRender = true
        }
      }

      if (needsRender) render(time)

      raf = requestAnimationFrame(loop)
    }

    render(start)
    raf = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(raf)
  }, [children, minSpeed, maxSpeed, fadeDuration])

  return (
    <span
      ref={ref}
      style={{
        fontFamily: 'monospace',
        whiteSpace: 'pre',
      }}
    />
  )
}

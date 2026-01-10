'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const FILTERS = ['all', 'illustration', 'graphic', 'logo']

function shuffle<T>(array: T[]) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

type ArtItem = {
  imgSrc: string
  tags: string[]
}

export default function ArtClient({ artData }: { artData: ArtItem[] }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeImage, setActiveImage] = useState<ArtItem | null>(null)
  const [shuffledArt, setShuffledArt] = useState<ArtItem[]>([])

  /* ✅ SHUFFLE ONLY AFTER MOUNT OR FILTER CHANGE */
  useEffect(() => {
    const base =
      activeFilter === 'all'
        ? artData
        : artData.filter((art) => art.tags.includes(activeFilter))

    setShuffledArt(shuffle(base))
  }, [activeFilter, artData])

  /* ESC + SCROLL LOCK */
  useEffect(() => {
    if (!activeImage) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImage(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [activeImage])

  return (
    <div className="container py-12">
      {/* FILTER BAR */}
      <div className="mb-8 flex flex-wrap gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition
              ${
                activeFilter === filter
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {filter === 'all' ? 'All' : filter}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="columns-2 md:columns-4 gap-4">
        {shuffledArt.map((art) => (
          <button
            key={art.imgSrc}
            onClick={() => setActiveImage(art)}
            className="mb-4 break-inside-avoid overflow-hidden rounded-lg"
          >
            <Image
              src={art.imgSrc}
              alt=""
              width={800}
              height={800}
              className="w-full h-auto object-cover"
            />
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setActiveImage(null)}
        >
          <Image
            src={activeImage.imgSrc}
            alt=""
            width={1600}
            height={1600}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  )
}

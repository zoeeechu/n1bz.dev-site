import fs from 'fs'
import path from 'path'

type ArtTag = 'illustration' | 'graphic' | 'logo'

type ArtItem = {
  imgSrc: string
  tags: ArtTag[]
}



/* MANUAL / FEATURED ART */

const manualArt: ArtItem[] = [
  {
    imgSrc: '/static/images/plui-banner.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/bbm.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/StarStruck_Banner.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/Nahla_Banner-01.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/Snickers_Banner-01.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/hamter.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/timeline.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/Pyro.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/Beans.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/BrewB.jpg',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/BUHBUH.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/ako.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/stellar.webp',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/numerouno-04.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/Zoe-Logo-Cube-01.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/ANIMAL_FARM-01.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/LycheeCafe-01.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/novel-alex-01.png',
    tags: ['logo', 'graphic'],
  },
  {
    imgSrc: '/static/images/Gambit-01.png',
    tags: ['logo', 'graphic'],
  },
]

/* AUTO-LOADED FOLDER ART */

const ROOT = path.join(process.cwd(), 'public/static/images')

function loadFolder(folder: string, tag: ArtTag): ArtItem[] {
  const dir = path.join(ROOT, folder)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => !file.startsWith('.'))
    .map((file) => ({
      id: `${folder}-${file}`,
      imgSrc: `/static/images/${folder}/${file}`,
      tags: [tag], 
    }))
}

const folderArt: ArtItem[] = [
  ...loadFolder('a', 'illustration'),
  ...loadFolder('v', 'graphic'),
  ...loadFolder('l', 'logo'),
]

/* MERGE + DEDUPE */

const seen = new Set<string>()

const artData: ArtItem[] = [...manualArt, ...folderArt].filter((art) => {
  if (seen.has(art.imgSrc)) return false
  seen.add(art.imgSrc)
  return true
})

export default artData
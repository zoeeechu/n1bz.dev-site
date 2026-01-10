import artData from '@/data/artData.server'
import ArtClient from './ArtClient'

export default function ArtPage() {
  return <ArtClient artData={artData} />
}
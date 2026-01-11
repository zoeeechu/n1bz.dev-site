import dynamic from 'next/dynamic'

const Censor = dynamic(() => import('../CensorText'), {
  ssr: false,
})

export default Censor
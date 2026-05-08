import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import Tiers from '@/components/Tiers'
import Library from '@/components/Library'
import ScheduleCTA from '@/components/ScheduleCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Services />
      <Tiers />
      <Library />
      <ScheduleCTA />
      <Footer />
    </>
  )
}
import React from 'react'
import Brands from '../components/Home/Brands'
import Hero from '../components/Home/Hero'
import Highlights from '../components/Home/Highlights'
import TriSection from '../components/Home/TriSection'
import Footer from '../components/Footer/Footer'

function Home() {
  return (
    <div>
        <Hero />
        <TriSection />
        <Highlights />
        <Brands />
        <Footer />
    </div>
  )
}

export default Home
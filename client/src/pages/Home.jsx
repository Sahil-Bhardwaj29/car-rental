import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FearturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'
const Home = () => {
  return (
    <>
      <Hero/>
      <FeaturedSection/>
      <Banner/>
      <Testimonial/>
      <Newsletter/>
    </>
  )
}

export default Home
import React from 'react'
import BannerHome from './BannerHome/BannerHome.component'
import AboutUs from './AboutUs/AboutUs.component'
import MostPopular from './MostPolular/MostPopular.component'
import CountUp from './CountUp/CountUp.component'
import FeatureTeacher from './FeatureTeacher/FeatureTeacher.container'

function Home() {
  return (
    <>
      <BannerHome />
      <AboutUs />
      <MostPopular />
      <CountUp />
      <FeatureTeacher />
    </>
  )
}

export default Home

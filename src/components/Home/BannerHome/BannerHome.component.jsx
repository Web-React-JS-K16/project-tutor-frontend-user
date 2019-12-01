import './BannerHome.scss'
import React from 'react'
import { UncontrolledCarousel } from 'reactstrap'
import imgbanner1 from '../../../assets/images/banner1.png'
import imgbanner2 from '../../../assets/images/banner2.png'
import imgbanner3 from '../../../assets/images/banner3.png'

const items = [
  {
    src: imgbanner1,
    altText: 'banner 1',
    key: '1',
  },
  {
    src: imgbanner2,
    altText: 'banner 2',
    key: '2',
  },
  {
    src: imgbanner3,
    altText: 'banner 3',
    key: '3',
  },
]

const BannerHome = () => <UncontrolledCarousel items={items} indicators={false} />

export default BannerHome

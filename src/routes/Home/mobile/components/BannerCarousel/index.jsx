import React from 'react'
import FindIt from 'routes/Home/assets/mobile/FindIt.jpg'
import BuildIt from 'routes/Home/assets/mobile/BuildIt.jpg'
import ShareIt from 'routes/Home/assets/mobile/ShareIt.jpg'
import EquipIt from 'routes/Home/assets/mobile/EquipIt.jpg'
import Banner from './components/Banner'
import ImageCarousel from 'components/ImageCarousel'

const BannerCarousel = props => (
  <ImageCarousel delay={5000} isMobile >
    <Banner img={FindIt} duration='5s' />
    <Banner img={BuildIt} duration='5s' />
    <Banner img={ShareIt} duration='5s' />
    <Banner img={EquipIt} duration='5s' />
  </ImageCarousel>
)

export default BannerCarousel

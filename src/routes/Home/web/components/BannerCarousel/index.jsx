import React from 'react'
import FindIt from 'routes/Home/assets/web/FindIt.jpg'
import BuildIt from 'routes/Home/assets/web/BuildIt.jpg'
import ShareIt from 'routes/Home/assets/web/ShareIt.jpg'
import EquipIt from 'routes/Home/assets/web/EquipIt.jpg'
import ImageCarousel from 'components/ImageCarousel'
import Banner from './components/Banner'

const banners = [
  {
    img: FindIt,
    text: <p>
      We help you find<br />
      recommended items,<br />
      based on your hobbies<br />
      and interests<br /><br />
      We show you peoples’<br />
      inventories through our<br />
      Loadouts so you can see<br />
      everything they use
    </p>
  },
  {
    img: BuildIt,
    text: <p>
      You can create your own<br />
      inventories with our Loadout<br />
      builder to show others<br />
      what products you use<br />
      or recommend<br /><br />
      You can create Loadouts<br />
      for any activity, hobby,<br />
      or interest you have
    </p>
  },
  {
    img: ShareIt,
    text: <p>
      Share your Loadouts with<br />
      your friends and followers<br />
      on your favorite social<br />
      media platforms<br /><br />
      Your reviews and<br />
      recommendations can help<br />
      others make informed<br />
      purchases
    </p>
  },
  {
    img: EquipIt,
    text: <p>
      We help you maintain<br />
      digital Gear Lists of the<br />
      things you own or<br />
      recommend<br /> <br />
      You get to share your<br />
      Gear Lists with your<br />
      friends and followers
    </p>
  },
]

const BannerCarousel = props => (
  <ImageCarousel delay={8000} >
    { banners.map((banner, key) => <Banner key={key} {...banner} duration='8s' />) }
  </ImageCarousel>
)

export default BannerCarousel

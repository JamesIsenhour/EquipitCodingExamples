import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Home.scss'

import Equipit from '../assets/mobile/EquipIt.jpg'

class Home extends React.PureComponent {
  constructor (props) {
    super(props)
  }

  handleOnClick = e => window.scrollTo(0, 0);

  render () {
    return (
      <React.Fragment>
        <img src={Equipit} styleName='banner' />
        <div styleName='content_container'>
          <div styleName='site_description_container white_background'>
            <div styleName='logo' />
            <p>
              A Loadout is an interactive gear list, used to showcase the products you use
                from each of your hobbies.
            </p>
            <p>Loadouts are built from a digital inventory of your favorite products that you recommend.</p>
            <p>Share these Loadouts on social media or embed them directly on your website.</p>
            <p>Create a free account to start building Loadouts</p>
            <Link to='/signup' styleName='home_button filled_button get_started'>Get Started</Link>
            <p styleName='login_prompt'>Already a member? <Link to='login' styleName='link'>Sign in here!</Link></p>
            <p style={{ textAlign: 'center' }}>
              Building your own Loadout is not currently available on mobile. Please use the full desktop
               version of the site.
            </p>
          </div>
          <div styleName='details_bar details_bar_height grey_background'>
            <div styleName='details_title_container'>
              <h2>Create an Inventory</h2>
              <div styleName='infographic_container margin_left_fix'>
                <div styleName='infographic infographic_inventory' />
              </div>
            </div>
            <div styleName='details_text_container'>
              <p>Add your favorite products to your digital Inventory using our Loadout Builder.</p>
              <p>Write your thoughts on your products and save them for later.</p>
            </div>
          </div>
          <div styleName='details_bar details_bar_height white_background'>
            <div styleName='details_title_container'>
              <div styleName='infographic_container margin_right_fix'>
                <div styleName='infographic infographic_build' />
              </div>
              <h2>Build Loadouts</h2>
            </div>
            <div styleName='details_text_container'>
              <p>A Loadout is comprised of two elements</p>
              <ul>
                <li>An image of your hobby</li>
                <li>The products you use for your hobby</li>
              </ul>
              <p>Build a Loadout by uploading an image and selecting the products you use for
                  your hobby, and design the look using our Loadout Builder.</p>
            </div>
          </div>
          <div styleName='details_bar details_bar_height grey_background'>
            <div styleName='details_title_container'>
              <h2>Share Anywhere</h2>
              <div styleName='infographic_container margin_left_fix'>
                <div styleName='infographic infographic_share' />
              </div>
            </div>
            <div styleName='details_text_container'>
              <p>Share your Loadouts with your friends or other people seeking recommendations.</p>
              <p>There are many ways to share your Loadout</p>
              <ul>
                <li>Link it on Facebook, Twitter, and LinkedIn</li>
                <li>Add it to your linktree on Instagram.</li>
                <li>Or embed it directly on your site!</li>
              </ul>
            </div>
          </div>
          <div styleName='details_bar details_bar_height white_background'>
            <div styleName='details_title_container'>
              <div styleName='infographic_container margin_right_fix'>
                <div styleName='infographic infographic_paid' />
              </div>
              <h2>Earn Commissions</h2>
            </div>
            <div styleName='details_text_container'>
              <p>No matter how big or small your impact, you deserve to get paid.</p>
              <p>Equipit utilizes affiliate networking to monetize links you provide through your Loadouts.</p>
              <p>
                Earn commissions based on these monetized links, so the more you recommend, the more
                  potential you can earn.
              </p>
              <p>
                Sign up and enter your PayPal account e-mail to start earning commissions, it's that simple!
              </p>
              <p>Here's some frequently asked questions, for more information.</p>
            </div>
          </div>
          <div styleName='details_bar grey_background' style={{ padding: '15px 0' }}>
            <h3 style={{ margin: 5, textAlign: 'center' }}>Now that you know what Loadouts are</h3>
            <Link to='/signup' styleName='home_button filled_button get_started'>Join Us!</Link>
            <p styleName='login_prompt'>Already a member? <Link to='login' styleName='link'>Sign in here!</Link></p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

// Home.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired,
// }

export default Home

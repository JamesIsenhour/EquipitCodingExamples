import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Banner.scss'

const Banner = props => (
  <div
    styleName={`banner_container${props.isFading ? ' fading' : ''}`}
    style={{ animationDuration: props.duration }}
  >
    <img styleName='image' src={props.img} />
    <div styleName='banner_text_positioning'>
      <div styleName='text_container'>
        {props.text}
        <div styleName='banner_btn_container'>
          <p>Learn more about</p>
          <Link to='/faq' styleName='how_it_works'>How It Works</Link>
        </div>
      </div>
    </div>
    <div styleName='overlay' />
  </div>
)

Banner.propTypes = {
  img: PropTypes.string.isRequired,
  text: PropTypes.node.isRequired,
  duration: PropTypes.string,
  isFading: PropTypes.bool,
}

Banner.defaultProps = {
  duration: '5s',
  isFading: false,
}

export default Banner

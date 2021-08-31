import React from 'react'
import PropTypes from 'prop-types'
import './Banner.scss'

const Banner = props => (
  <div styleName='banner_container'>
    <div styleName='banner'>
      <div styleName='banner_positioning' >
        <img src={props.img} styleName='image' />
      </div>
    </div>
  </div>
)
Banner.propTypes = {
  img: PropTypes.string.isRequired,
}

Banner.defaultProps = {
  duration: '5s',
  isFading: false
}

export default Banner

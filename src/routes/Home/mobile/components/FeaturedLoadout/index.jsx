import React from 'react'
import { Link } from 'react-router-dom'
import './FeaturedLoadout.scss'
import PropTypes from 'prop-types'

const FeaturedLoadout = props => (
  <Link to={`/viewer/lo/${props.id}`}
    styleName='loadout_link'
    style={{ width: props.width }}
  >
    <img src={props.image} />
  </Link>
)

FeaturedLoadout.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

FeaturedLoadout.defaultProps = {
  width: '100%'
}

export default FeaturedLoadout

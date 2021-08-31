import React from 'react'
import { Map } from 'immutable'
import { Link } from 'react-router-dom'
import './LoadoutSlot.scss'
import PropTypes from 'prop-types'

const LoadoutSlot = props => (
  <Link to={`/viewer/lo/${props.slot.get('code')}`} styleName='loadout_slot'>
    <img src={props.slot.get('image_medium_uri')} alt={`loadout:${props.slot.get('code')}`} />
  </Link>
)

LoadoutSlot.propTypes = {
  slot: PropTypes.instanceOf(Map).isRequired,
}

export default LoadoutSlot

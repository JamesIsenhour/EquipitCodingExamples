import React from 'react'
import { Map } from 'immutable'
import { Link } from 'react-router-dom'
import './ItemSlot.scss'
import PropTypes from 'prop-types'

const ItemSlot = props => (
  <Link to={`/viewer/lo/${props.loadoutCode}/slots#${props.slot.get('name')}`} styleName='item_slot'>
    <img src={_EQ.getItemImage(props.slot.get('item'))} alt={props.slot.get('name')} />
  </Link>
)

ItemSlot.propTypes = {
  slot: PropTypes.instanceOf(Map).isRequired,
  loadoutCode: PropTypes.string.isRequired,
}

export default ItemSlot

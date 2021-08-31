import React from 'react'
import { Map, List } from 'immutable'
import './LoadoutView.scss'
import PropTypes from 'prop-types'

class LoadoutView extends React.Component {
  constructor (props) {
    super(props)
  }

  handleOnClickHotspot = e => {
    this.props.onClickHotspot(parseInt(e.target.dataset.slotno))
  }

  buildSlotStyling = transform => ({
    height: `${transform.getIn(['height', 'value']) * 100}%`,
    width: `${transform.getIn(['width', 'value']) * 100}%`,
    left: `${transform.getIn(['x', 'value']) * 100}%`,
    top: `${transform.getIn(['y', 'value']) * 100}%`
  })

  render () {
    let slots = this.props.slots.map((slot, key) => (
      <span key={key}
        styleName='hotspot'
        data-slotno={key}
        onClick={this.handleOnClickHotspot}
        style={this.buildSlotStyling(slot.get('transformation'))}
      />
    ))

    let embeddedSlots = this.props.embeddedSlots.map((slot, key) => (
      <a key={key}
        href={'/viewer/lo/' + slot.getIn(['embedded', 'code'], '0')}
        styleName='hotspot'
        style={this.buildSlotStyling(slot.get('transformation'))}
      />
    ))

    return (
      <div styleName='firefox_fix'>
        <div styleName='loadout_container'>
          <img
            src={this.props.loadout.getIn(['image', 'browser'])}
            alt='Loadout'
          />
          {slots}
          {embeddedSlots}
        </div>
      </div>
    )
  }
}

LoadoutView.propTypes = {
  loadout: PropTypes.instanceOf(Map).isRequired,
  slots: PropTypes.instanceOf(List).isRequired,
  embeddedSlots: PropTypes.instanceOf(List).isRequired,
  onClickHotspot: PropTypes.func.isRequired,
}

LoadoutView.defaultProps = {
}

export default LoadoutView

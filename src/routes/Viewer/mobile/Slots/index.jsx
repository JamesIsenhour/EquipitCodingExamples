import React from 'react'
import { List } from 'immutable'
import PropTypes from 'prop-types'
import './Slots.scss'
import LoadoutSlot from './components/LoadoutSlot'
import ItemSlot from './components/ItemSlot'

class Slots extends React.PureComponent {
  constructor (props) {
    super(props)
  }

  addEmptyDivs = (type, amount) => {
    let results = []
    for (let i = 0; i < amount; i++) {
      results.push(<div styleName={`empty_${type}`} key={`empty_${i}`} />)
    }
    return results
  }

  render () {
    return (
      <React.Fragment>
        {this.props.embeddedSlots.size > 0 && <div styleName='section'>
          <div styleName='section_title'><p>Embedded Loadout Links</p></div>
          {this.props.embeddedSlots.map(
            slot => <LoadoutSlot key={slot.get('name')} slot={slot} loadoutCode={this.props.loadoutCode} />
          )}
          {this.addEmptyDivs('loadout', Math.floor(this.props.embeddedSlots.size / 2))}
        </div>}
        <div styleName='section'>
          <div styleName='section_title'><p>Items</p></div>
          {this.props.slots.map(
            slot => <ItemSlot key={slot.get('name')} slot={slot} loadoutCode={this.props.loadoutCode} />
          )}
          {this.addEmptyDivs('item', Math.floor(this.props.slots.size / 3))}
        </div>
      </React.Fragment>
    )
  }
}

Slots.propTypes = {
  slots: PropTypes.instanceOf(List).isRequired,
  embeddedSlots: PropTypes.instanceOf(List).isRequired,
  loadoutCode: PropTypes.string.isRequired,
}

export default Slots

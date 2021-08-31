import React from 'react'
import { Map, List } from 'immutable'
import PropTypes from 'prop-types'
import './Viewer.scss'
import AsyncLoader from 'components/AsyncLoader'
import Resize from 'hocs/HOCResize'
import Details from './components/Details'
import Synopsis from './components/Synopsis'
import SlotModal from './components/SlotModal'
import Viewport from './components/Viewport'
import ListView from './components/Viewport/components/ListView'
import RelatedLoadouts from './components/RelatedLoadouts'

class Viewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSlotModal: false,
      currentSlot: -1,
    }
  }

  handleOnClickHotspot = slotNumber => this.setState({ showSlotModal: true, currentSlot: slotNumber })
  handleSlotModalClose = () => this.setState({ showSlotModal: false })

  handlesNextSlot = () => {
    let currentSlot = this.state.currentSlot
    let slotNo = currentSlot >= this.props.slots.size - 1 ? 0 : currentSlot + 1
    this.setState({ currentSlot: slotNo })
  }

  handlePreviousSlot = () => {
    const currentSlot = this.state.currentSlot
    let slotNo = currentSlot <= 0 ? this.props.slots.size - 1 : currentSlot - 1
    this.setState({ currentSlot: slotNo })
  }

  render () {
    return (
      <AsyncLoader
        status={this.props.loadingStatus}
      >
        <div styleName='viewer_content_container'>
          <Synopsis
            user={this.props.user}
            title={this.props.loadout.get('title')}
          />
          <div styleName='content_container'>
            <Viewport
              slots={this.props.slots}
              embeddedSlots={this.props.embeddedSlots}
              loadout={this.props.loadout}
              onClickHotspot={this.handleOnClickHotspot}
            />
            {/* <div styleName='loadout_controls' /> */}
            <Details
              description={this.props.loadout.get('description', '')}
              tags={this.props.loadout.get('tags')}
              title={this.props.loadout.get('title')}
            />
            <div styleName='separator'>
              <RelatedLoadouts
                initialize={this.props.fetchRelatedLoadouts}
                loadouts={this.props.relatedLoadouts}
                columns={5}
                rows={1}
              />
            </div>
          </div>
          {this.state.showSlotModal && <SlotModal
            handleNext={this.handlesNextSlot}
            handlePrevious={this.handlePreviousSlot}
            onRequestClose={this.handleSlotModalClose}
            productDetails={this.props.slots.get(this.state.currentSlot).get('item')}
            usercode={this.props.user.get('code')}
          />}
          {this.props.window.width >= 1600 && <div styleName='items_side_bar'>
            <ListView
              items={this.props.slots.map(slot => slot.get('item'))}
              onClickItem={this.handleOnClickHotspot}
              title={'Items Quick View'}
              columns={1} rows={10}
            />
          </div>}
        </div>
      </AsyncLoader>
    )
  }
}

Viewer.propTypes = {
  loadout: PropTypes.instanceOf(Map).isRequired,
  user: PropTypes.instanceOf(Map).isRequired,

  slots: PropTypes.object.isRequired,
  embeddedSlots: PropTypes.object.isRequired,

  loadingStatus: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  relatedLoadouts: PropTypes.instanceOf(List).isRequired,
  fetchRelatedLoadouts: PropTypes.func.isRequired,

  window: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
}

export default Resize(Viewer)

import React from 'react'
import './Viewport.scss'
import PropTypes from 'prop-types'
import ViewportTabs from './components/ViewportTabs'
import LoadoutView from './components/LoadoutView'
import ListView from './components/ListView'

class Viewport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 0
    }
  }

  handleOnSelectTab = tab => this.setState({ selectedTab: tab })

  render () {
    return (
      <ViewportTabs
        selectedTab={this.state.selectedTab}
        onSelectTab={this.handleOnSelectTab}
      >
        <LoadoutView
          label='Loadout Image View'
          icon='logo'
          {...this.props}
        />
        <ListView
          label='List View'
          icon='menu'
          items={this.props.slots.map(slot => slot.get('item'))}
          onClickItem={this.props.onClickHotspot}
        />
      </ViewportTabs>
    )
  }
}

Viewport.propTypes = {
  loadout: PropTypes.object.isRequired, // Immutable Map
  slots: PropTypes.object.isRequired, // Immutable List
  embeddedSlots: PropTypes.object.isRequired, // Immutable List
  onClickHotspot: PropTypes.func.isRequired,
}

Viewport.defaultProps = {
}

export default Viewport

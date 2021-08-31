import React from 'react'
import './ViewportTabs.scss'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'

class ViewportTabs extends React.Component {
  constructor (props) {
    super(props)
  }

  handleOnSelectTab = (e) => {
    this.props.onSelectTab(parseInt(e.currentTarget.dataset.tab))
  }

  getTabs = (child, index) => {
    const selected = this.props.selectedTab === index
    const classes = 'tab' + (selected ? ' selected_tab' : '')
    return (
      <div key={index}
        styleName={classes}
        data-tab={index}
        title={child.props.label}
        onClick={this.handleOnSelectTab}
      >
        <div styleName='tab_icon'>
          <Icon name={child.props.icon} />
        </div>
      </div>
    )
  }

  render () {
    const tabs = this.props.children.map(this.getTabs)

    return (
      <div styleName='content_container'>
        <div styleName='tabs_container'>
          {tabs}
        </div>
        {this.props.children[this.props.selectedTab]}
      </div>
    )
  }
}

ViewportTabs.propTypes = {
  children: PropTypes.node.isRequired,
  selectedTab: PropTypes.number.isRequired, // Array index
  onSelectTab: PropTypes.func.isRequired
}

ViewportTabs.defaultProps = {
}

export default ViewportTabs

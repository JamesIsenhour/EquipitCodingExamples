import React from 'react'
import { Link } from 'react-router-dom'
import { Map, List } from 'immutable'
import PropTypes from 'prop-types'
import truncate from 'lodash/truncate'
import './Viewer.scss'
import DefaultProfile from 'assets/DefaultProfilePicture.svg'
import Icon from 'components/Icon'
import AsyncLoader from 'components/AsyncLoader'
import ModalMenu from 'components/MobileOnly/ModalMenu'
import Slots from './Slots'

class Viewer extends React.Component {
  constructor (props) {
    super(props)
    let hostName = 'www.equipit.com'
    if (__DEV__) {
      hostName = 'beta.equipit.com'
    }
    const sharingLink = hostName + window.location.pathname
    this.menuOptions = [
      { label: 'Share to Twitter', type: 'atag', content: this.shareToTwitter(sharingLink) },
      { label: 'Share to Facebook', type: 'atag', content: this.shareToFacebook(sharingLink) },
      {
        label: 'Share to LinkedIn',
        type: 'atag',
        content: this.shareToLinkedIn(sharingLink, props.loadout.get('title'))
      },
      { label: 'Copy Link To Clipboard', type: 'func', content: this.onClickHandlerUrl },
    ]
    this.state = {
      menu: false,
      description: false,
    }
  }

  shareToFacebook = link => `https://www.facebook.com/sharer/sharer.php?u=${link}`
  shareToTwitter = link => `https://twitter.com/home?status=${link}`
  shareToLinkedIn = (link, title) => (
    `https://www.linkedin.com/shareArticle?mini=true&url=${link}&title=${title}&summary=&source=`
  )

  onOpenShareMenu = () => this.setState({ menu: true })
  onCloseShareMenu = () => this.setState({ menu: false })

  onClickHandlerUrl = (event) => {
    /* Highly hacky code warning.
      Refer: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript */
    let textArea = document.createElement('textarea')
    textArea.style.position = 'fixed'
    textArea.style.top = 0
    textArea.style.left = 0
    textArea.style.width = '2em'
    textArea.style.height = '2em'
    textArea.style.padding = 0
    textArea.style.border = 'none'
    textArea.style.outline = 'none'
    textArea.style.boxShadow = 'none'
    textArea.style.background = 'transparent'
    textArea.value = window.location.href
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
    } catch (err) {
      console.log('Oops, unable to copy')
    }
    document.body.removeChild(textArea)
  }

  render () {
    const loadoutSummary = truncate(
      this.props.loadout.get('description'),
      { length: Math.floor(3 * ((screen.width - 16) / 6.5) - 3) }
    )
    return (
      <AsyncLoader
        status={this.props.loadingStatus}
      >
        <img styleName='loadout_image' src={this.props.loadout.getIn(['image', 'tablet'])} />
        <div styleName='loadout_proxy' />
        <div styleName='user_info_container'>
          <Link to={`/profile/${this.props.user.get('code')}`} styleName='profile_image_container'>
            <img
              src={this.props.user.get('image') || DefaultProfile}
              alt={this.props.user.get('screenName')}
            />
          </Link>
          <div styleName='titles_container'>
            <p styleName='user_name'>{this.props.user.get('screenName')}</p>
            <p styleName='loadout_title'>{this.props.loadout.get('title')}</p>
          </div>
          <span styleName='share_menu' onClick={this.onOpenShareMenu}>
            <Icon name='link' />
          </span>
        </div>
        <p styleName='summary_container'>
          {loadoutSummary}
        </p>
        <Slots
          slots={this.props.slots}
          embeddedSlots={this.props.embeddedSlots}
          loadoutCode={this.props.loadout.get('code')}
        />
        {this.state.menu && <ModalMenu
          onRequestClose={this.onCloseShareMenu}
          options={this.menuOptions}
        />}
      </AsyncLoader>
    )
  }
}

Viewer.propTypes = {
  loadingStatus: PropTypes.number,
  loadout: PropTypes.instanceOf(Map).isRequired, // Immutable Map
  user: PropTypes.instanceOf(Map).isRequired, // Immutable Map
  slots: PropTypes.instanceOf(List).isRequired, // Immutable List
  embeddedSlots: PropTypes.instanceOf(List).isRequired,
}

Viewer.defaultProps = {}

export default Viewer

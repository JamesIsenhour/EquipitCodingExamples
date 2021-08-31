import React from 'react'
import { Link } from 'react-router-dom'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import './Synopsis.scss'
import DefaultProfilePicture from 'assets/DefaultProfilePicture.svg'
import TextInput from 'components/TextInput'
import Icon from 'components/Icon'
import EmbedModal from './components/EmbedModal'

class Synopsis extends React.Component {
  constructor (props) {
    super(props)
    this.hostName = window.location.host
    if (__DEV__) {
      this.hostName = 'beta.equipit.com'
    }
    const sharingLink = this.hostName + window.location.pathname
    this.sharing = {
      link: sharingLink,
      iframe: [
        { width: 500, height: 380 },
        { width: 800, height: 530 },
        { width: 1200, height: 770 },
      ],
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${sharingLink}`,
      twitter: `https://twitter.com/home?status=${sharingLink}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${sharingLink}&title=${this.props.title}&summary=&source=` // eslint-disable-line max-len
    }

    this.state = {
      modal: false
    }
  }

  handleOnChange = () => 0

  handleOnOpenModal = e => this.setState({ modal: true })
  handleOnCloseModal = e => this.setState({ modal: false })

  render () {
    let description = this.props.user.get('description') ||
      `There is no description for ${this.props.user.get('screenName')}...`
    return (
      <div styleName='details_content_container'>
        <Link to={`/profile/${this.props.user.get('code')}`} styleName='profile_image_container' >
          <img src={this.props.user.get('image') || DefaultProfilePicture}
            alt={'link to ' + this.props.user.get('screenName') + '\'s profile'}
          />
        </Link>
        <h3 styleName='user_name'>{this.props.user.get('screenName')}</h3>
        <div styleName='details_block separator'>
          <div styleName='information_group loadout_description '>
            <h2>About {this.props.user.get('screenName')}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div styleName='navigation_block'>
          <h2>Share this Loadout</h2>
          <nav styleName='navigation_container'>
            <button type='text' styleName='navigation_link iframe_link' onClick={this.handleOnOpenModal}>
              <div styleName='arrow left' />
              <div styleName='arrow right' />
            </button>
            <a href={this.sharing.facebook} target='_blank' styleName='navigation_link social_link facebook'>
              <Icon name='facebook' title='Share to Facebook' />
            </a>
            <a href={this.sharing.twitter} target='_blank' styleName='navigation_link social_link twitter'>
              <Icon name='twitter' title='Share to Twitter' />
            </a>
            <a href={this.sharing.linkedin} target='_blank' styleName='navigation_link social_link linkedin'>
              <Icon name='linkedin' title='Share to Linkedin' version='alternate' />
            </a>
          </nav>
          <TextInput
            handleOnChange={this.handleOnChange}
            name='sharinglink'
            value={this.sharing.link}
          />
        </div>
        {this.state.modal && <EmbedModal
          iframes={this.sharing.iframe}
          link={this.sharing.link.replace('viewer', 'iframe')}
          onClose={this.handleOnCloseModal}
        />}
      </div>
    )
  }
}

Synopsis.propTypes = {
  user: PropTypes.instanceOf(Map).isRequired,
  title: PropTypes.string,
}

Synopsis.defaultProps = {
  profileImage: DefaultProfilePicture,
  name: 'Unknown',
  title: 'No title available',
}

export default Synopsis

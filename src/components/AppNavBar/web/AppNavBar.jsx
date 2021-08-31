import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './AppNavBar.scss'

import Icon from 'components/Icon'
import DefaultProfilePicture from 'assets/DefaultProfilePicture.svg'
import LoginButton from 'containers/LoginButton'

import LogoImage from '../assets/logo.png'

class AppNavBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loadoutSearchTerms: ''
    }
  }

  componentWillMount = () => this.setState({ loadoutSearchTerms: this.props.searchTerms })

  componentWillReceiveProps = nextProps => {
    if (this.state.loadoutSearchTerms !== nextProps.searchTerms) {
      this.setState({ loadoutSearchTerm: nextProps.searchTerms })
    }
  }

  handleLoadoutSearchInputChange = event => this.setState({ loadoutSearchTerms: event.target.value })

  handleSearchSubmit = (event) => {
    event.preventDefault()
    this.props.setSearchTerms(this.state.loadoutSearchTerms)
  }

  render () {
    let endButtons = []
    if (!this.props.isLoggedIn) {
      endButtons.push(<LoginButton key='login' redirectTo={'/'} />)
      endButtons.push(<Link to='/signup' key='signup' styleName='signup'>Sign Up</Link>)
    } else {
      endButtons.push(
        <Link to={`/profile/${this.props.user}`}
          styleName='profile' key='profile'
        >
          <img src={this.props.profilePicture} alt='profile' />
          <div styleName='overlay' />
        </Link>
      )
    }

    const pathname = this.props.location.pathname.slice(1).split('/')[0]

    return (
      <div styleName='app_bar'>
        <div styleName='inner_bar'>
          <div styleName='logo_container'>
            <Link to='/'>
              <img styleName='logo_image' alt='Equipit Logo' src={LogoImage} />
            </Link>
          </div>
          <div styleName='children_container'>
            <form styleName='search_form' onSubmit={this.handleSearchSubmit}>
              <input type='text'
                id='search_input'
                name='search'
                title='Search Loadouts'
                placeholder='Search Loadouts...'
                value={this.state.loadoutSearchTerms}
                onChange={this.handleLoadoutSearchInputChange}
              />
              <button styleName='submit'
                type='submit'
                aria-label='Submit Loadout Search'
                title='Submit Loadout search'
                onClick={this.handleSearchSubmit}
              >
                <Icon name='search' />
              </button>
            </form>
            {this.props.children}
          </div>
          <div styleName='navigation_buttons_container'>
            <Link to='/'
              styleName={`navigation_button${(pathname === '' && ' current_page') || ''}`}
            >
              Home
            </Link>
            <Link to='/browse'
              styleName={`navigation_button${(pathname === 'browse' && ' current_page') || ''}`}
            >
              Browse
            </Link>
            {this.props.isLoggedIn && <Link to='/builder'
              styleName={`navigation_button${(pathname === 'builder' && ' current_page') || ''}`}
            >
              Build a Loadout
            </Link>}
            <Link to='/blog/page/1'
              styleName={`navigation_button${(pathname === 'blog' && ' current_page') || ''}`}
            >
              Blog
            </Link>
            <nav styleName='menu_drop_down'>
              <ul><li styleName='top_menu' style={{ padding: '0 15px' }}>
                <span styleName='menu_button'>
                  <Icon name='ellipsis' width={25} height={25} />
                </span>
                <ul styleName='menu'>
                  {this.props.isLoggedIn && [
                    <li key='logout'>
                      <div onClick={this.props.logoutRequest}>Logout</div>
                    </li>,
                    <li key='setting'>
                      <Link to={`/profile/${this.props.user}?t=account_settings`}>Account Settings</Link>
                    </li>,
                  ]
                  }
                  {this.props.links.map(link => (
                    <li key={link.url}><Link to={link.url}>{link.label}</Link></li>
                  ))}
                </ul>
              </li></ul>
            </nav>
            {endButtons}
          </div>
        </div>
      </div>
    )
  }
}

AppNavBar.propTypes = {
  children: PropTypes.node,
  isLoggedIn: PropTypes.bool.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  profilePicture: PropTypes.string,
//  menu: PropTypes.bool,
//  navButtons: PropTypes.array,
  searchTerms: PropTypes.string,
  setSearchTerms: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  )
}

AppNavBar.defaultProps = {
  menu: false,
  navButtons: [],
  profilePicture: DefaultProfilePicture,
}

export default AppNavBar

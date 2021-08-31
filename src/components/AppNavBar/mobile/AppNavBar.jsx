import React from 'react'
import { Link } from 'react-router-dom'
import history from 'store/history'
import PropTypes from 'prop-types'

import './AppNavBar.scss'

import Icon from 'components/Icon'
import TextInput from 'components/TextInput'
import ModalMenu from 'components/MobileOnly/ModalMenu'

class AppNavBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menu: false,
      searchFormDisplay: false,
      search: '',
    }
    this.menuOptions = this.props.links.map(link => ({
      label: link.label, type: 'link', content: link.url
    }))
  }

  componentWillUpdate = (nextProps) => {
    if (nextProps.location.pathname !== this.props.location.pathname &&
      this.state.searchFormDisplay) {
      this.setState({ searchFormDisplay: false, search: '' })
    }
  }

  onRequestOpen = (e) => this.setState({ menu: true, searchFormDisplay: false })
  onRequestClose = (e) => this.setState({ menu: false })
  openSearchForm = (e) => this.setState({ searchFormDisplay: true, menu: false })
  closeSearchForm = (e) => this.setState({ searchFormDisplay: false })

  handleOnChangeSearch = (e) => this.setState({ search: e.target.value })

  handleSearchSubmit = (e) => {
    e.preventDefault()
    history.push(`/search?q=${this.state.search}&page=1`)
    this.setState({ searchFormDisplay: false, search: '' })
  }

  render () {
    const location = this.props.location.pathname.slice(1).split('/')[0]

    const menuOptions = (this.props.isLoggedIn
      ? [
        { label: 'Log Out', type: 'func', content: this.props.logoutRequest },
        { label: 'Account Settings', type: 'link', content: `/profile/${this.props.user}?t=account_settings` }
      ]
      : [
        { label: 'Log In', type: 'link', content: '/login' },
        { label: 'Sign Up', type: 'link', content: '/signup' }
      ]
    ).concat([{ label: 'Our Blog', type: 'link', content: '/blog/page/1' }], this.menuOptions)

    const searchInputForm = (
      <React.Fragment>
        <form onSubmit={this.handleSearchSubmit} styleName='search_input_form'>
          <Icon name='search' width={30} height={30} padding={4} fill='#384A60' />
          <TextInput
            name='search'
            placeholder='Search Loadouts...'
            handleOnChange={this.handleOnChangeSearch}
            value={this.state.search}
          />
          <button type='button'
            styleName='close_search'
            onClick={this.closeSearchForm}
          >
            X
          </button>
        </form>
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <div styleName='nav_bar_proxy' />
        <div styleName='nav_bar'>
          <Link to='/' styleName={'nav_button' + (location === '' ? ' current_page' : '')}>
            <Icon name='home' width={35} height={35} />
          </Link>
          <Link to='/browse' styleName={'nav_button' + (location === 'browse' ? ' current_page' : '')}>
            <Icon name='categories' width={35} height={35} />
          </Link>
          <div
            onClick={location !== 'search' ? this.openSearchForm : null}
            styleName={'nav_button' + (location === 'search' || this.state.searchFormDisplay ? ' current_page' : '')}
          >
            <Icon name='search' width={35} height={35} />
          </div>
          <Link to={`/profile/${this.props.user}`}
            styleName={'nav_button' + (location === 'profile' ? ' current_page' : '')}
          >
            <Icon name='profile' width={35} height={35} />
          </Link>
          <div styleName={'nav_button menu' + (this.state.menu ? ' current_page' : '')} onClick={this.onRequestOpen}>
            <Icon name='ellipses' width={35} height={35} />
          </div>
          {this.state.menu && <ModalMenu
            onRequestClose={this.onRequestClose}
            options={menuOptions}
          />}
          {this.state.searchFormDisplay && searchInputForm}
        </div>
        {this.state.searchFormDisplay && <div styleName='search_background' onClick={this.closeSearchForm} />}
      </React.Fragment>
    )
  }
}

AppNavBar.propTypes = {
  location: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  )
}

export default AppNavBar

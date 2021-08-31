import { connect } from 'react-redux'
import { logoutRequest, setSearchTerms } from 'modules/session'

import AppNavBarWeb from './web/AppNavBar'
import AppNavBarMob from './mobile/AppNavBar'
import { withRouter } from 'react-router-dom'
import ViewSelector from 'hocs/ViewSelector'

const menuLinks = [
  { label: 'Contact Us', url: '/contact' },
  { label: 'Help & Support', url: '/support' },
]

const mapDispatchToProps = {
  logoutRequest,
  setSearchTerms,
}

const mapStateToProps = (state) => ({
  isLoggedIn : state.get('session').get('loggedIn'),
  user: state.getIn(['session', 'userCode']),
  searchTerms: state.getIn(['session', 'searchTerms'], ''),
  profilePicture: state.getIn(['session', 'userImage', 'uri']),
  links: menuLinks,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewSelector()(AppNavBarWeb, AppNavBarMob)))

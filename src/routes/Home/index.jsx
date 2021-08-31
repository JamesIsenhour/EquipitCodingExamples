import { fromJS } from 'immutable'

import { connect } from 'react-redux'

import ViewSelector from 'hocs/ViewSelector'
import Form from 'hocs/Form'
import HomeHOC from './hoc/Home'
import HomeWeb from './web/Home'
import HomeMob from './mobile/Home'

document.title = document.title.replace(/( \| )([^|]*)$/, `$1Custom Gear Lists`)

const fetchLoadouts = () => _EQ.makeFetch('/published/search?category=Tablet&terms=&page=1')

const getLoadouts = async () => {
  let response = await fetchLoadouts()
  if (response.ok) {
    response = await response.json()
    if (response && response.loadouts) {
      return fromJS(response.loadouts)
    }
  }
  return null
}

const inputs = [
  {
    name: 'screen_name',
    inputType: 'text',
    label: 'Screen name',
    placeholder: 'Choose a screen name',
    tooltip: 'A screen name must be between 1 and 20 characters or digits' +
      ' and it cannot contain any symbols except - or _',
    pattern: '^[\\w\\s]{1,64}$',
    error: {
      message: 'Choose a screen name',
    }
  },
  {
    name: 'email',
    inputType: 'text',
    type: 'email',
    label: 'Email address',
    placeholder: 'Email address',
    pattern: _EQ.EMAIL_REGEX_STRING,
    error: {
      message: 'Email address required',
    }
  },
  {
    name: 'confirmEmail',
    inputType: 'text',
    type: 'email',
    label: 'Confirm your email address',
    placeholder: 'Confirm your email address',
    pattern: _EQ.EMAIL_REGEX_STRING,
    error: {
      message: 'Emails do not match',
    }
  },
  {
    name: 'password',
    inputType: 'text',
    type: 'password',
    label: 'Password',
    tooltip: 'Your password must be a minimum of 8 characters long, ' +
      'contain an uppercase letter, a lowercase letter, and a number',
    placeholder: 'Add a password',
    pattern: _EQ.PASSWORD_REGEX_STRING,
    error: {
      message: 'A valid password is required',
    }
  },
]

const onSubmit = async formData => {
  delete formData.confirmEmail
  const response = await _EQ.makeFetch('/users/signup', 'POST', false, { signup: [formData] })
  return response.status
}

const mapStateToProps = state => ({
  isLoggedIn: state.getIn(['session', 'loggedIn'])
})

export default connect(mapStateToProps, {})(
  ViewSelector({ getLoadouts, inputs, onSubmit })(
    Form(HomeHOC(HomeWeb)), Form(HomeHOC(HomeMob))
  )
)

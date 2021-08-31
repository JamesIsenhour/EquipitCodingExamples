import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Home.scss'

import Card from 'components/Card'
import HomeForm from 'components/HomeForm'

import InputValidation from 'components/InputValidation'
import FormInputLabel from 'components/FormInputLabel'
import TextInput from 'components/TextInput'

import Renderer from 'components/ApiRenderers/StandardApiRenderer'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.inputRefs = []
  }

  handleOnClick = e => window.scrollTo(0, 400);

  isFormValid = () => this.inputRefs.filter(input => !input.isValid || !input.isValid()).length === 0

  pushInputRef = ref => { this.inputRefs.push(ref) }

  renderStates = {
    success: (
      <p style={{ textAlign: 'center', alignSelf: 'center' }}>
        Thank you for signing up!<br />
        Please check your email for verification.
      </p>
    ),
    failed: (
      <p style={{ textAlign: 'center', alignSelf: 'center' }}>
        Sorry, something went wrong with your request
      </p>
    )
  }

  render () {
    const initialState = (
      <HomeForm
        onSubmit={this.props.onSubmit}
        submitText='Sign Up'
        alignSubmit='center'
        width='80%'
      >
        {
          this.props.inputs.map(input => (
            <div styleName='input_container' key={input.name}>
              <FormInputLabel label={input.label}>
                <InputValidation
                  ref={this.pushInputRef}
                  pattern={input.pattern}
                  validator={input.validator}
                  error={input.error}
                  inputValue={input.value}
                >
                  <TextInput {...input} />
                </InputValidation>
              </FormInputLabel>
            </div>
          ))
        }
        <p styleName='agreement'>
          By signing up you agree to our&nbsp;
          <Link to='/terms' styleName='link'>Terms of Use</Link>
          &nbsp;and&nbsp;
          <Link to='/privacy' styleName='link'>Privacy Policy</Link>
          ,<br />
          including Cookie Use.
        </p>
      </HomeForm>
    )

    return (
      <div styleName='content_layout'>
        <h1 styleName='hidden'>Equipit | Your Personalized Gear Hub | Home</h1>
        <div styleName='banner_image' />
        <div styleName='content_container'>
          <div styleName='bar_layout horizontal_layout sign_up_section'>
            <div styleName='form_container'>
              <Card size='medium'
                title={this.props.isLoggedIn ? '' : 'Create a new account'}
                backgroundColor={this.props.isLoggedIn ? 'bkg_color_off_white' : undefined}
              >
                <div styleName='success_container'>
                  {this.props.isLoggedIn
                    ? <div styleName='vertical_layout text_layout welcome'>
                      <h2>Welcome! Let's get started!</h2>
                      <Link to='/browse' styleName='home_button border_button'>Check out some Loadouts</Link>
                      <div styleName='divider'><span /><p>or</p><span /></div>
                      <Link to='/builder' styleName='home_button filled_button'>Build a Loadout</Link>
                    </div>
                    : <Renderer
                      {...this.renderStates}
                      initial={initialState}
                      status={this.props.status}
                    />
                  }
                </div>
              </Card>
            </div>
            <div styleName='vertical_layout text_layout'>
              <h2>Get Started</h2>
              <p>Create a free account to start building Loadouts</p>
              <p>
                A Loadout is an interactive gear list, used to showcase the products you use
                 from each of your hobbies.
              </p>
              <p>Loadouts are built from a digital inventory of your favorite products that you recommend.</p>
              <p>Share these Loadouts on social media or embed them directly on your website.</p>
            </div>
          </div>
          <div styleName='bar_layout horizontal_layout equal_space grey_background'>
            <div styleName='vertical_layout text_layout icon_layout'>
              <div styleName='infographic infographic_build' />
              <h2>Build Loadouts</h2>
              <p>
                Add your favorite products to your own personal Inventory, then organize those
                  products into graphical gear lists called Loadouts.
              </p>
              <p>A Loadout is comprised of two main elements</p>
              <ul>
                <li>A background image</li>
                <li>The products you recommend</li>
              </ul>
            </div>
            <div styleName='vertical_layout text_layout icon_layout'>
              <div styleName='infographic infographic_share' />
              <h2>Share Anywhere</h2>
              <p>Share your Loadouts with your friends, followers, or peers seeking recommendations.</p>
              <p>There are many ways to share your Loadout</p>
              <ul>
                <li>Link it on Facebook, Twitter, and LinkedIn</li>
                <li>Add it to your linktree on Instagram.</li>
                <li>Or embed it directly on your site!</li>
              </ul>
            </div>
            <div styleName='vertical_layout text_layout icon_layout'>
              <div styleName='infographic infographic_paid' />
              <h2>Get Paid</h2>
              <p>No matter how big or small your impact, you deserve to get paid.</p>
              <p>Equipit tracks your sales from your Loadouts and pay you a commission for your product referral.</p>
            </div>
          </div>
          <div styleName='horizontal_layout bar_layout'>
            <div styleName='extra_info_bar'>
              <div styleName='vertical_layout text_layout'>
                <h2>Earn Commissions</h2>
                <p>Everyone deserves to get paid for making product recommendations.</p>
                <p>Equipit utilizes affiliate networking to monetize links you provide through your Loadouts.</p>
                <p>
                  Earn commissions based on these monetized links, so the more you recommend, the more
                   potential you can earn.
                </p>
                <p>
                  Sign up and enter your PayPal account e-mail to start earning commissions, it's that simple!
                </p>
                <p>Here's some frequently asked questions, for more information.</p>
              </div>
              <div styleName='image_container_affiliate image_right'>
                <div styleName='bar_image affiliate_sizing'>
                  <div styleName='image affiliate_image' />
                </div>
              </div>
            </div>
          </div>
          <div styleName='horizontal_layout bar_layout grey_background'>
            <div styleName='extra_info_bar'>
              <div styleName='image_container_embed image_left'>
                <div styleName='bar_image embed_sizing'>
                  <div styleName='image embed_image' />
                </div>
              </div>
              <div styleName='vertical_layout text_layout'>
                <h2>Embed on Your Site</h2>
                <p>Creating content?</p>
                <p>
                  Embed your loadout on your website to give your visitors an interactive
                  experience to learn about your product choices.
                </p>
              </div>
            </div>
          </div>
          <div styleName='vertical_layout bar_layout' style={{ alignItems: 'center' }}>
            <p styleName='return_text'>
              Now that you know what loadouts are
            </p>
            {
              this.props.isLoggedIn
                ? <Link to='/builder' styleName='home_button filled_button'>Start Building</Link>
                : <button styleName='home_button filled_button' onClick={this.handleOnClick}>Start Building</button>
            }
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      type: PropTypes.string,
      inputType: PropTypes.string.isRequired,
      error: PropTypes.shape({
        message: PropTypes.string,
        position: PropTypes.string,
      }),
      selectOptions: PropTypes.array,
      pattern: PropTypes.string,
      width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ])
    }).isRequired
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}

export default Home

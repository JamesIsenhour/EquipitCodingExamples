import React from 'react'
import PropTypes from 'prop-types'
import './EmbedModal.scss'
import Modal from 'components/Modal'
import FormInputLabel from 'components/FormInputLabel'
import RadioButtonGroup from 'components/Inputs/RadioButtonGroup'

class EmbedModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = { size: 0 }
  }

  handleOnChangeSize = e => this.setState({ size: parseInt(e.target.value) })

  getIframe = (link, width, height) => (
    `<iframe src="https://${link}" width="${width}" height="${height}" style="border:none"></iframe>`
  )

  render () {
    const size = this.props.iframes[this.state.size]
    const iframe = this.getIframe(this.props.link, size.width, size.height)

    return (
      <Modal onRequestClose={this.props.onClose}>
        <div styleName='iframe_container'>
          <FormInputLabel
            label='Size of your Iframe (in pixels)'
            tooltip='Select a size for your iframe based on our default sizes.'
          >
            <div styleName='button_group'>
              <RadioButtonGroup
                buttons={this.props.iframes.map((iframe, idx) => ({
                  label: `${iframe.width} W x ${iframe.height} H`,
                  value: `${idx}`,
                }))}
                name='size'
                onSelect={this.handleOnChangeSize}
                currentValue={`${this.state.size}`}
              />
            </div>
          </FormInputLabel>
          <div styleName='iframe_code_container'>
            <FormInputLabel
              label='Iframe embed code'
            >
              <p styleName='iframe_code'>{iframe}</p>
            </FormInputLabel>
          </div>
        </div>
      </Modal>
    )
  }
}

EmbedModal.propTypes = {
  iframes: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  link: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

EmbedModal.defaultProps = {
}

export default EmbedModal

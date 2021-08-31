import React from 'react'
import PropTypes from 'prop-types'
import './SlotModal.scss'
import Modal from 'components/Modal'
import ItemDisplay from 'components/ItemDisplay'

class SlotModal extends React.PureComponent {
  constructor (props) {
    super(props)
  }

  handleBackgroundClick = e => this.props.onRequestClose(e)

  handleKeyDown = e => {
    const keyCode = e.keyCode
    if (keyCode === 27) {
      this.props.onRequestClose(e)
    } else if (keyCode === 39) {
      this.props.handleNext()
    } else if (keyCode === 37) {
      this.props.handlePrevious()
    }
  }

  render () {
    // let review = ''
    // if (this.props.productDetails.get('reviews')) {
    //   review = this.props.productDetails.get('reviews').filter(
    //     (review) => review.getIn(['user', 'code']) === this.props.userCode
    //   ).getIn([0, 'review'], '')
    // }

    return (
      <Modal onRequestClose={this.props.onRequestClose}>
        <div
          styleName='slot_modal_content'
          tabIndex='0'
          onKeyDown={this.handleKeyDown}
        >
          <ItemDisplay
            usercode={this.props.usercode}
            item={this.props.productDetails}
            onClose={this.props.onRequestClose}
            hasMultipleItems
            onClickNextItem={this.props.handleNext}
            onClickPrevItem={this.props.handlePrevious}
          />
        </div>
      </Modal>
    )
  }
}

SlotModal.propTypes = {
  handleNext: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  productDetails: PropTypes.object.isRequired,
  usercode: PropTypes.string.isRequired,
}

SlotModal.defaultProps = {

}

export default SlotModal

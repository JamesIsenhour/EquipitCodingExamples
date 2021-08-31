import React from 'react'
import './Item.scss'
import PropTypes from 'prop-types'

class Item extends React.Component {
  constructor (props) {
    super(props)
  }

  handleOnClick = e => this.props.onClick(parseInt(e.target.dataset.slotno))

  render () {
    return (
      <div styleName='item_container'
        onClick={this.handleOnClick}
        data-slotno={this.props.slotNo}
        style={{ width: this.props.width }}
      >
        <div styleName='image_container'>
          <img src={this.props.image} alt={this.props.name} />
        </div>
        <p styleName='title'>{this.props.name }</p>
      </div>
    )
  }
}

Item.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string.isRequired,
  slotNo: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
}

Item.defaultProps = {
  width: '100%',
}

export default Item

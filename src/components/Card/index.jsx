import React from 'react'
import PropTypes from 'prop-types'
import styles from './Card.scss'  // eslint-disable-line no-unused-vars
import StyleLib from '../../styles/StyleLibrary.scss'  // eslint-disable-line no-unused-vars

class Card extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const classes = (
      'styles.' + this.props.size + '_card ' +
      'styles.' + this.props.direction +
      (this.props.padding ? ' styles.card_padding' : '') +
      ' StyleLib.' + this.props.backgroundColor
    )

    return (
      <div styleName={classes}>
        {this.props.title ? <h3 styleName='styles.card_title'>{this.props.title}</h3> : null}
        {this.props.children}
      </div>
    )
  }
}

Card.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
  padding: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string
}

Card.defaultProps = {
  backgroundColor: 'bkg_color_primary_light',
  direction: 'vertical',
  padding: true,
  size: 'large',
  title: null
}

export default Card

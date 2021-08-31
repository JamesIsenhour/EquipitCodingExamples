import React from 'react'
import { Link } from 'react-router-dom'
import './LoadoutLink.scss'
import PropTypes from 'prop-types'

class LoadoutLink extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Link to={`/viewer/lo/${this.props.loadout.code}`}
        styleName='result'
        style={{ width: this.props.width }}
      >
        <img src={this.props.loadout.image} alt={this.props.loadout.name} />
      </Link>
    )
  }
}

LoadoutLink.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  loadout: PropTypes.shape({
    code: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
}

LoadoutLink.defaultProps = {
  width: '100%'
}

export default LoadoutLink

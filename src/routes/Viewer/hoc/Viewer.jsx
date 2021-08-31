import React from 'react'
import PropTypes from 'prop-types'

const Viewer = Component => {
  class HOC extends React.Component {
    constructor (props) {
      super(props)

      this.props.initialize()
    }

    componentDidUpdate = (prevProps) => {
      if (prevProps.location.pathname !== this.props.location.pathname &&
        this.props.location.pathname.includes('viewer')) {
        this.props.initialize()
      }
    }

    render () {
      return <Component {...this.props} />
    }
  }

  HOC.propTypes = {
    location: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  return HOC
}

export default Viewer

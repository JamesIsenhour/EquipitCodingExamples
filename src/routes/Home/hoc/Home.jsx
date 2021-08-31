import React from 'react'
import PropTypes from 'prop-types'

const Home = Component => {
  class HOC extends React.Component {
    constructor (props) {
      super(props)
      this.ref = null
    }

    isFormValid = () => this.ref && this.ref.isFormValid()

    testEmailMatch = () => this.props.inputs[1].value === this.props.inputs[2].value

    render () {
      const inputs = this.props.inputs.map(input => {
        if (input.name === 'confirmEmail') {
          input.validator = this.testEmailMatch
        }
        return input
      })
      return <Component
        ref={ref => (this.ref = ref)}
        {...this.props}
        inputs={inputs}
      />
    }
  }

  HOC.propTypes = {
    inputs: PropTypes.array.isRequired,
  }

  return HOC
}

export default Home

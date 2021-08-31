import React from 'react'
import debounce from 'lodash/debounce'

const Resize = WrappedComponent => {
  class HOC extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        window: {
          width: 0,
          height: 0,
        }
      }
      this.updateWindowSize = this.updateWindowSize.bind(this)
      this.handleUpdateWindowSize = this.handleUpdateWindowSize.bind(this)
    }

    componentWillMount = () => {
      this.updateWindowSize()
      window.addEventListener('resize', this.handleUpdateWindowSize)
    }

    componentWillUnmount = () => {
      window.removeEventListener('resize', this.handleUpdateWindowSize)
    }

    updateWindowSize () {
      this.setState({ window: { width: window.innerWidth, height: window.innerHeight } })
    }

    handleUpdateWindowSize = debounce(this.updateWindowSize, 150)

    render () {
      return <WrappedComponent window={this.state.window} {...this.props} />
    }
  }

  return HOC
}

export default Resize

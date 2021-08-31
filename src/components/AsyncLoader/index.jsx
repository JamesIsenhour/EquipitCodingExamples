import React from 'react'
import history from 'store/history'
import './AsyncLoader.scss'
import PropTypes from 'prop-types'
import LoadingIndicator from 'components/LoadingIndicator'

class AsyncLoader extends React.Component {
  constructor (props) {
    super(props)
    this.delay = undefined
    this.state = { isDelayed: true }
  }

  componentDidMount = () => {
    this.props.onMountAsyncFunc()
    this.delay = setTimeout(() => this.setState({ isDelayed: false }), 500)
  }

  componentWillUnmount = () => { clearTimeout(this.delay) }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.status !== this.props.status) {
      switch (true) {
        case (nextProps.status >= 400) :
          this.goToClientError()
          break
        case (isNaN(nextProps.status)) :
          this.delay = setTimeout(this.setTimer, 500)
          this.setState({ isDelayed: true })
          break
        default :
          clearTimeout(this.delay)
      }
    }
  }

  goToClientError = () => { history.replace('/404') }

  setTimer = () => this.setState({ isDelayed: false })

  render () {
    if (this.props.status >= 200 && this.props.status < 400) {
      return <React.Fragment>{this.props.children}</React.Fragment>
    }
    return this.state.isDelayed ? null : this.props.loading
  }
}

AsyncLoader.propTypes = {
  onMountAsyncFunc: PropTypes.func,
  status: PropTypes.number.isRequired,
  loading: PropTypes.element,
  children: PropTypes.node.isRequired,
}

AsyncLoader.defaultProps = {
  onMountAsyncFunc: () => undefined,
  loading: <div styleName='loading_default'><LoadingIndicator type='ring' /></div>
}

export default AsyncLoader

import { connect } from 'react-redux'
import { compose } from 'redux'
import injectReducer from 'store/injectReducer'

import { withRouter } from 'react-router-dom'

import Reducer, { actions } from './modules/viewer'
import ViewSelector from 'hocs/ViewSelector'
import ViewerHOC from './hoc/Viewer'
import ViewerWeb from './web/Viewer'
import ViewerMob from './mobile/Viewer'

const mapDispatchToProps = {
  initialize: actions.initialize,
  resetViewer: actions.resetViewer,
  fetchRelatedLoadouts: actions.fetchRelatedLoadouts,
  clearRelatedLoadouts: actions.clearRelatedLoadouts,
}

const mapStateToProps = (state) => {
  const viewerState = state.get('viewer')
  return {
    embeddedSlots: viewerState.get('embeddedSlots'),
    loadout: viewerState.get('loadout'),
    user: viewerState.get('user'),
    slots: viewerState.get('slots'),
    loadingStatus: viewerState.get('loadingStatus'),
    relatedLoadouts: viewerState.get('relatedLoadouts'),
  }
}

export default withRouter(compose(
  injectReducer({ key: 'viewer', reducer: Reducer }),
  connect(mapStateToProps, mapDispatchToProps),
)(ViewSelector()(ViewerHOC(ViewerWeb), ViewerHOC(ViewerMob))))

// @flow
import { Map, List, fromJS } from 'immutable'
import history from 'store/history'
import * as utils from './utils'
import * as api from './api'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_INITIAL_LOADOUT = 'ADD_INITIAL_LOADOUT'
export const RESET_VIEWER = 'RESET_VIEWER'
export const VIEWER_REQUEST_LOADING = 'VIEWER_REQUEST_LOADING'
export const SET_RELATED_LOADOUTS = 'SET_RELATED_LOADOUTS'
// ------------------------------------
// Actions
// ------------------------------------
// Sync Actions.

export const addInitialLoadout = obj => ({ type: ADD_INITIAL_LOADOUT, payload: obj })
export const resetViewer = () => ({ type: RESET_VIEWER, payload: initialState })
export const changeRequestLoading = bool => ({ type: VIEWER_REQUEST_LOADING, payload: bool })
export const setRelatedLoadouts = loadouts => ({ type: SET_RELATED_LOADOUTS, payload: loadouts })

// Async actions

// Deals with initializing the state of the page on initial load.
export const initialize = () => {
  return async (dispatch, getState) => {
    dispatch(changeRequestLoading(NaN))
    const locationParams = history.location.pathname.slice(1).match(/[^/]+/g)
    let loadoutCode = null
    for (var i = 0; i < locationParams.length; i++) {
      if (locationParams[i].match(/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i)) {
        loadoutCode = locationParams[i]
        break
      }
    }
    if (loadoutCode) {
      let response = await api.getLoadoutInfo(loadoutCode)
      if (response.ok) {
        response = await response.json()
        if (response && response.published_loadouts) {
          dispatch(addInitialLoadout(utils.normalizeLoadout(response.published_loadouts[0])))
        }
      } else {
        dispatch(changeRequestLoading(response.status))
      }
    } else {
      dispatch(changeRequestLoading(404))
    }
  }
}

export const fetchRelatedLoadouts = () => {
  return async (dispatch, getState) => {
    const userCode = getState().getIn(['viewer', 'user', 'code'], '')
    const loadoutCode = getState().getIn(['viewer', 'loadout', 'code'], '')
    const response = await api.getRelatedLoadouts(userCode)
    if (response.ok) {
      const json = await response.json()
      if (json && json.loadouts && json.loadouts.length > 1) {
        const relatedLoadouts = json.loadouts.filter(loadout => loadout.code !== loadoutCode)
        dispatch(setRelatedLoadouts(relatedLoadouts))
      }
    }
  }
}

export const clearRelatedLoadouts = () => (dispatch, getState) => { dispatch(setRelatedLoadouts([])) }

export const actions = {
  initialize,
  resetViewer,
  fetchRelatedLoadouts,
  clearRelatedLoadouts,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_INITIAL_LOADOUT]: (state, action) => state.withMutations((state) => {
    const loadoutDetails = fromJS(action.payload)
    return state.set('loadout', loadoutDetails.get('loadout'))
      .set('user', loadoutDetails.get('user'))
      .set('loadingStatus', 200)
      .set('slots', loadoutDetails.get('itemSlots'))
      .set('embeddedSlots', loadoutDetails.get('embeddedSlots'))
      .set('relatedLoadouts', List())
  }),
  [RESET_VIEWER]: (state, action) => action.payload,

  [VIEWER_REQUEST_LOADING]: (state, action) => state.set('loadingStatus', action.payload),
  [SET_RELATED_LOADOUTS]: (state, action) => state.set('relatedLoadouts', fromJS(action.payload)),
}

// ------------------------------------
// Reducer
// ------------------------------------

const StatePrototype = {
  loadingStatus: NaN,

  loadout : Map({
    tags: List(),
    code: '',
  }),
  user: Map(),

  embeddedSlots: List(),
  slots: List(),

  relatedLoadouts: List(),
}
const initialState = Map(StatePrototype)

export default function viewerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

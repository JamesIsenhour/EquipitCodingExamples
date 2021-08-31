import { fromJS } from 'immutable'
import * as mutate from './mutators'
import types from './types'
import _actions from './actions'

export const actions = _actions

// Actions Handlers

const ACTION_HANDLERS = {
  [types.RESET_INVENTORY]: (state, action) => initialState,

  [types.SET_REQUEST_STATUS]: (state, action) => mutate.setStatus(action.payload)(state),

  [types.SET_INVENTORY]: (state, action) => mutate.pipe([
    mutate.setInventory(action.payload),
    mutate.setStatus(200),
  ], state),

  [types.SET_SELECTION]: (state, action) => mutate.setSelection(action.payload)(state),

  [types.ADD_ITEM_TO_INVENTORY]: (state, action) => mutate.pipe([
    mutate.addItemToInventory(action.payload),
    mutate.setStatus(200),
  ], state),

  [types.REMOVE_ITEM_FROM_INVENTORY]: (state, action) => mutate.pipe([
    mutate.removeItemFromInventory(action.payload),
    mutate.setStatus(200),
  ], state),
}

const initialState = fromJS({
  items: {},
  dirty: true,
  searchTerms: [],
  requestStatus: -1,
  selection: {},
})

export default function inventoryReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

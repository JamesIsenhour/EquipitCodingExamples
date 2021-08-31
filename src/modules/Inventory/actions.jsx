import { Map, fromJS } from 'immutable'
import * as types from './types'
import * as api from './api'
import * as utils from './utils'
import { fetchProduct as productModuleFetch } from 'modules/Products/actions'

export const setRequestStatus = obj => ({ type: types.SET_REQUEST_STATUS, payload: obj })
export const addItemToInventory = obj => ({ type: types.ADD_ITEM_TO_INVENTORY, payload: obj })
export const removeItemFromInventory = str => ({ type: types.REMOVE_ITEM_FROM_INVENTORY, payload: str })
export const clearInventory = () => ({ type: types.SET_INVENTORY, payload: [] })
export const resetInventoryStore = () => ({ type: types.RESET_INVENTORY, payload: null })

export const setSelection = (item, callback) => (dispatch, getState) => {
  const currentItem = getState().getIn(['inventory', 'selection'], Map())
  dispatch({ type: types.SET_SELECTION, payload: currentItem.merge(fromJS(item)) })
  if (callback) {
    callback(item)
  }
}

// Thunk

// Inventory Items API
export const uploadItemToInventoryURL = (obj, callback) => async (dispatch, getState) => {
  dispatch(setRequestStatus(NaN))
  let response = await api.uploadToInventory(obj, 'custom')
  let item = Map()
  if (response && response.inventory) {
    item = utils.buildItemfromInventoryApi(response, obj.user_review)
    dispatch(addItemToInventory(item))
  } else {
    dispatch(setRequestStatus(400))
  }
  if (callback) {
    callback(item)
  }
}

export const uploadItemToInventoryAPI = (obj, item = Map(), callback) => async (dispatch, getState) => {
  dispatch(setRequestStatus(NaN))
  const procedure = utils.getProcedure(item, obj.review)
  const inventoryID = procedure === 'PUT' ? item.get('inventoryID') : ''
  if (procedure) {
    const response = await api.uploadToInventory(
      {
        code: obj.item.get('code'),
        user_review: obj.review,
      },
      obj.item.get('type') === 'url' ? 'custom' : 'general',
      procedure,
      inventoryID
    )
    if (response && response.inventory) {
      item = utils.buildItemfromInventoryApi(response, obj.review)
      dispatch(addItemToInventory(item))
    } else {
      dispatch(setRequestStatus(400))
    }
  } else {
    dispatch(setRequestStatus(200))
  }
  if (callback) {
    callback(item)
  }
}

export const deleteItemFromInventory = (itemcode, callback) => async (dispatch, getState) => {
  dispatch(setRequestStatus(NaN))
  const item = getState().getIn(['inventory', 'items', itemcode])
  if (item) {
    let response = await api.deleteFromInventory(item.get('inventoryID'))
    if (response.ok) {
      dispatch(removeItemFromInventory(itemcode))
      if (callback) {
        callback(item)
      }
      return
    }
  }
  dispatch(setRequestStatus(400))
}

// Fetch Inventory
export const fetchCurrentUserInventory = () => (dispatch, getState) => {
  dispatch(fetchInventory(getState().getIn(['session', 'userCode'])))
}

export const fetchInventory = usercode => async (dispatch, getState) => {
  dispatch(setRequestStatus(NaN))

  let response = await api.fetchInventory(usercode)
  if (response.ok) {
    response = await response.json()
    if (response && response.inventory) {
      const prevInventory = getState().getIn(['inventory', 'items'], Map()).toJS()
      dispatch({
        type: types.SET_INVENTORY,
        payload: response.inventory.reduce((result, inventoryItem) => ({
          ...result,
          [inventoryItem.item.code]: {
            ...inventoryItem.item,
            review: inventoryItem.user_review,
            inventoryID: inventoryItem.code,
          }
        }), prevInventory)
      })
      return
    }
  }
  dispatch(setRequestStatus(400))
}

export const setToInventory = inventory => (dispatch, getState) => {
  const prevInventory = getState().getIn(['inventory', 'items'], Map()).toJS()
  dispatch({
    type: types.SET_INVENTORY,
    payload: inventory.reduce((result, item) => (
      result[item.code]
        ? result
        : {
          ...result,
          [item.code]: { ...item, inventoryID: '' }
        }
      ), prevInventory)
  })
}

export const fetchProduct = code => async (dispatch, getState) => (
  dispatch(productModuleFetch(code, setSelection))
)

export default {
  setRequestStatus,
  setSelection,
  clearInventory,
  resetInventoryStore,
  deleteItemFromInventory,
  uploadItemToInventoryAPI,
  uploadItemToInventoryURL,
  fetchCurrentUserInventory,
  fetchInventory,
  fetchProduct,
}

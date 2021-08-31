import { fromJS, Map } from 'immutable'

export const getProcedure = (item, review) => {
  let procedure = 'POST'
  if (item && !item.isEmpty()) {
    procedure = item.get('inventoryID')
      ? item.get('review') === review
        ? ''
        : 'PUT'
      : 'POST'
  }
  return procedure
}

export const buildItemfromInventoryApi = (response, review = '') => {
  if (response.inventory) {
    const inventoryKey = Object.keys(response.inventory)[0] || ''
    const apiItem = response.inventory[inventoryKey].item
    if (apiItem) {
      const item = fromJS({ ...apiItem, review: review, inventoryID: inventoryKey })
      return item
    }
  }
  return Map()
}

import { fromJS } from 'immutable'

export const setInventory = inventory => s => s.set('items', fromJS(inventory))
export const addItemToInventory = item => s => s.setIn(['items', item.get('code')], item)
export const removeItemFromInventory = itemcode => s => s.deleteIn(['items', itemcode])

export const setStatus = status => s => s.set('requestStatus', status)
export const setSelection = item => s => s.set('selection', fromJS(item))
export const setDirtyBit = bit => s => s.set('dirty', bit)
export const setSearchTerms = searchTerms => s => s.set('searchTerms', fromJS(searchTerms))

const applyFn = (state, fn) => fn(state)

export const pipe = (fns, state) => state.withMutations(s => fns.reduce(applyFn, s))

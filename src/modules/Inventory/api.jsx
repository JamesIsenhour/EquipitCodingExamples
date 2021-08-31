// export const fetchInventory = userCode => _EQ.makeFetch(`/users/${userCode}/inventory`, 'GET', true)
export const fetchInventory = userCode => _EQ.makeFetch(`/inventory`, 'GET', true)

export const fetchProduct = code => _EQ.makeFetch(`/items/${code}`, 'GET', true)

export const uploadItem = code => _EQ.makeFetch(`/items/${code}`, 'POST', true)

export const uploadToInventory = async (item, source, procedure = 'POST', inventoryID) => {
  const query = `/inventory${inventoryID ? `/${inventoryID}` : ''}`
  let response = await _EQ.makeFetch(query, procedure, true, {
    inventory: {
      [inventoryID || 'empty']: {
        item: item,
        user_review: item.user_review,
        status: 'private',
        source: source
      }
    }
  })
  return response.json()
}

export const deleteFromInventory = inventoryCode => _EQ.makeFetch(`/inventory/${inventoryCode}`, 'DELETE', true)

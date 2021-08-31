// Get slot and user information for a particular loadout, given the loadout code.
export const getLoadoutInfo = (code) => (
  _EQ.makeFetch(`/loadouts/${code}/published`)
)

export const getRelatedLoadouts = terms => (
  _EQ.makeFetch(`/users/${terms}/loadouts`, 'GET', true)
)

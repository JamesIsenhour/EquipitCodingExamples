import isEmpty from 'lodash/isEmpty'

export const normalizeLoadout = loadout => ({
  user: buildUser(loadout.user),
  loadout: buildLoadout(loadout),
  ...buildSlotLists(loadout.selections)
})

export const buildUser = (user = {}) => {
  let result = {
    code: user.code,
    screenName: user.screen_name,
  }
  if (user.profile) {
    result = {
      ...result,
      description: user.profile.description,
      image: isEmpty(user.profile.image) ? '' : user.profile.image.uri
    }
  }
  return result
}

export const buildLoadout = loadout => {
  let tags = ''
  let description = loadout.description || ''
  const tagIndex = description.indexOf('Tags:')
  if (tagIndex > -1) {
    tags = description.slice(tagIndex + 7).split(' ').filter(Boolean)
    description = description.slice(0, tagIndex - 1) || 'There is no description for this Loadout...'
  }
  return {
    code: loadout.code,
    image: {
      browser: loadout.published.Browser.image_uri,
      tablet: loadout.published.Tablet.image_uri,
    },
    description,
    title: loadout.name || 'No title',
    tags
  }
}

export const buildSlotLists = selections => {
  const results = {
    embeddedSlots: [],
    itemSlots: [],
  }
  Object.keys(selections).forEach(key => {
    const selection = selections[key]
    selection.hasOwnProperty('embedded')
      ? results.embeddedSlots.push(selection)
      : results.itemSlots.push(selection)
  })
  return results
}

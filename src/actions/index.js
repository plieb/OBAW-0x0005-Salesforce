const actions = {
  'city-houses': require('./city-houses'),
  'find-bedrooms': require('./find-bedrooms'),
  'houses-range': require('./houses-range'),
  'price-changes': require('./price-changes'),
  'broker-info': require('./broker-info'),
  'contact-me': require('./contact-me'),
  'schedule-visit': require('./schedule-visit'),
  'confirm-visit': require('./confirm-visit'),
}

export default function handleAction(res, payload, message) {
  const currentAction = res.action && res.action.slug
  console.log(currentAction)
  let replies = []
  if (actions[currentAction]) {
    console.log('Enter action')
    replies = actions[currentAction].default(res, payload, message)
  } else if (res.reply()) {
    replies.push({
      type: 'text',
      content: res.reply(),
    })
  } else {
    replies.push({
      type: 'text',
      content: 'Sorry I did not understand',
    })
  }
  return replies
}

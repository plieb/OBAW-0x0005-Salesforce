/* module imports */
const salesforce = require('../salesforce')
const formatter = require('../formatter')

export default async function scheduleVisit(res, payload) {
  console.log('SCHEDULE VISIT')

  const replies = []
  const properties = await salesforce.findProperties({ id: payload.propertyId })
  if (properties.length) {
    replies.push(formatter.formatAppointment(properties[0]))
  } else {
    replies.push(formatter.formatMsg('I need you to select a property !'))
  }
  return replies
}


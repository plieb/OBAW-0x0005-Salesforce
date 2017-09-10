/* module imports */
const salesforce = require('../salesforce')
const formatter = require('../formatter')

export default async function contactMe(res, payload, message) {
  console.log('CONTACT ME')

  const replies = []
  replies.push(formatter.formatMsg('Thanks for your interest. I asked a broker to contact you asap.'))
  console.log('======================================')
  console.log(message)
  console.log(message.message)
  console.log(message.message.data)
  console.log('======================================')
  const firstName = message.message.data.userName.split(' ')[0]
  const lastName = message.message.data.userName.split(' ')[1]
  if (payload.propertyId) {
    const propertyId = payload.propertyId
    await salesforce.createCase(`${firstName} ${lastName}`, message.senderId, propertyId)
  } else {
    await salesforce.createCase(`${firstName} ${lastName}`, message.senderId)
  }
  return replies
}

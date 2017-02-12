/* modules imports */
const formatter = require('../formatter')

export default async function confirmVisit(res, payload) {
  console.log('CONFIRM VISIT')

  const replies = []
  if (payload.date) {
    replies.push(formatter.formatMsg(`OK, your appointment is confirmed for ${payload.date} in ${payload.city}.`))
  } else {
    replies.push(formatter.formatMsg('OK, your appointment is confirmed !'))
  }
  return replies
}

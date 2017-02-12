/* modules imports */
const formatter = require('../formatter')

export default async function brokerInfo(res, payload) {
  console.log('BROKER INFO')

  const replies = []
  replies.push(formatter.formatMsg('Here is the broker information'))
  replies.push(formatter.formatBroker(payload))
  return replies
}

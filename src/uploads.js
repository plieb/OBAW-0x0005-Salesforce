/* modules imports */
const formatter = require('./formatter')
const salesforce = require('./salesforce')
const visionService = require('./vision-service-mock')

export default async function processUpload(attachment) {
  console.log('UPLOAD IMAGE')

  const replies = []
  replies.push(formatter.formatMsg('OK, let me look at that picture...'))
  const houseType = await visionService.classify(attachment.content)
  replies.push(formatter.formatMsg(`Looking for houses matching "${houseType}"`))
  const properties = await salesforce.findPropertiesByCategory(houseType)
  if (properties.length) {
    replies.push(formatter.formatProperties(properties))
  } else {
    replies.push(formatter.formatMsg(`Couldn't find any houses matching "${houseType}"`))
  }
  return replies
}

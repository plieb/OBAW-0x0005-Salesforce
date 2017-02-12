/* module imports */
const salesforce = require('../salesforce')
const formatter = require('../formatter')

export default async function priceChanges() {
  console.log('PRICE CHANGES')

  const replies = []
  replies.push(formatter.formatMsg('OK, looking for recent price changes...'))
  const priceVariation = await salesforce.findPriceChanges()
  if (priceVariation.length) {
    replies.push(formatter.formatProperties(priceVariation))
  } else {
    replies.push(formatter.formatMsg('Couldn\'t find any price changes'))
  }
  return replies
}


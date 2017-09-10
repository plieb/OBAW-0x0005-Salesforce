/* module imports */
const salesforce = require('../salesforce')
const formatter = require('../formatter')

export default async function cityHousesRange(res) {
  console.log('HOUSES RANGE')

  const replies = []
  const city = res.entities.location ? res.entities.location[0].raw : null
  if (res.entities.number && city) {
    if (res.entities.number.length === 2) {
      const priceMin = res.entities.number[0].scalar
      const priceMax = res.entities.number[1].scalar
      const properties = await salesforce.findProperties({ priceMin, priceMax, city })
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formatMsg(`Couldn't find any houses in ${city} between ${priceMin} and ${priceMax}`))
      }
    } else {
      replies.push(formatter.formatMsg('I need a price a price range !'))
    }
  } else if (res.entities.number) {
    if (res.entities.number.length === 2) {
      const priceMin = res.entities.number[0].scalar
      const priceMax = res.entities.number[1].scalar
      replies.push(formatter.formatMsg(`OK, looking for houses between ${priceMin} and ${priceMax}`))
      const properties = await salesforce.findProperties({ priceMin, priceMax })
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formatMsg(`Couldn't find any houses between ${priceMin} and ${priceMax}`))
      }
    } else {
      replies.push(formatter.formatMsg('I need a price a price range !'))
    }
  } else {
    replies.push(formatter.formatMsg('I need a price a price range !'))
  }
  return replies
}

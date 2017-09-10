/* module imports */
const salesforce = require('../salesforce')
const formatter = require('../formatter')

export default async function findBedrooms(res) {
  console.log('FIND BEDRROMS')

  const replies = []
  const city = res.entities.location ? res.entities.location[0].raw : null
  const bedrooms = parseInt(res.entities.location ? res.entities.bedrooms[0].raw : null, 10)
  if (res.entities.number && city) {
    if (res.entities.number.length === 2) {
      const priceMin = res.entities.number[0].scalar
      const priceMax = res.entities.number[1].scalar
      replies.push(formatter.formatMsg(`OK, looking for houses between ${priceMin} and ${priceMax} in ${city} with ${bedrooms} bedrooms`))
      const properties = await salesforce.findProperties({ priceMin, priceMax, city, bedrooms })
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formatMsg(`Couldn't find any houses in ${city} between ${priceMin} and ${priceMax} with ${bedrooms} bedrooms`))
      }
    } else {
      replies.push(formatter.formatMsg(`OK, looking for houses between in ${city} with ${bedrooms} bedrooms`))
      const properties = await salesforce.findProperties({ city, bedrooms })
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formatMsg(`Couldn't find any houses in ${city} with ${bedrooms} bedrooms`))
      }
    }
  } else if (res.entities.number) {
    if (res.entities.number.length === 2) {
      const priceMin = res.entities.number[0].scalar
      const priceMax = res.entities.number[1].scalar
      replies.push(formatter.formatMsg(`OK, looking for houses between ${priceMin} and ${priceMax} with ${bedrooms} bedrooms`))
      const properties = await salesforce.findProperties({ priceMin, priceMax, bedrooms })
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formatMsg(`Couldn't find any houses between ${priceMin} and ${priceMax} with ${bedrooms} bedrooms`))
      }
    } else {
      replies.push(formatter.formatMsg(`OK, looking for houses between with ${bedrooms} bedrooms`))
      const properties = await salesforce.findProperties({ bedrooms })
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formatMsg(`Couldn't find any houses with ${bedrooms} bedrooms`))
      }
    }
  } else if (city) {
    replies.push(formatter.formatMsg(`OK, looking for houses between with ${bedrooms} bedrooms in ${city}`))
    const properties = await salesforce.findProperties({ bedrooms, city })
    if (properties.length) {
      replies.push(formatter.formatProperties(properties))
    } else {
      replies.push(formatter.formatMsg(`Couldn't find any houses with ${bedrooms} bedrooms in ${city}`))
    }
  } else {
    replies.push(formatter.formatMsg(`OK, looking for houses between with ${bedrooms} bedrooms`))
    const properties = await salesforce.findProperties({ bedrooms })
    if (properties.length) {
      replies.push(formatter.formatProperties(properties))
    } else {
      replies.push(formatter.formatMsg(`Couldn't find any houses with ${bedrooms} bedrooms`))
    }
  }
  return replies
}

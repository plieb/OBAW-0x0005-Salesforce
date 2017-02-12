/* module imports */
const moment = require('moment')
const numeral = require('numeral')

exports.formatMsg = msg => ({
  type: 'text',
  content: msg,
})

exports.formatProperties = (properties) => {
  const elements = []
  properties.forEach((property) => {
    elements.push({
      title: property.get('Title__c'),
      subtitle: `${property.get('Address__c')}, ${property.get('City__c')} ${property.get('State__c')} · ${numeral(property.get('Price__c')).format('$0,0')}`,
      imageUrl: property.get('Picture__c'),
      buttons: [
        {
          type: 'postback',
          title: 'Schedule visit',
          value: JSON.stringify({
            text: 'Schedule visit',
            propertyId: property.getId(),
          }),
        },
        {
          type: 'postback',
          title: 'View broker info',
          value: JSON.stringify({
            text: 'View broker info',
            propertyId: property.getId(),
          }),
        },
        {
          type: 'postback',
          title: 'Contact me',
          value: JSON.stringify({
            text: 'Contact me',
            propertyId: property.getId(),
          }),
        },
      ],
    })
  })
  return {
    type: 'carouselle',
    content: elements,
  }
}

exports.formatPriceChanges = (priceChanges) => {
  const elements = []
  priceChanges.forEach((priceChange) => {
    const property = priceChange.get('Parent')
    elements.push({
      title: `${property.Address__c}, ${property.City__c} ${property.State__c}`,
      subtitle: `Old price: ${numeral(priceChange.get('OldValue')).format('$0,0')} · New price: ${numeral(priceChange.get('NewValue')).format('$0,0')} on ${moment(priceChange.get('CreatedDate')).format('MMM Do')}`,
      imageUrl: property.Picture__c,
      buttons: [
        {
          type: 'postback',
          title: 'Schedule visit',
          value: JSON.stringify({
            text: 'Schedule visit',
            propertyId: property.Id,
          }),
        },
        {
          type: 'postback',
          title: 'View broker info',
          value: JSON.stringify({
            text: 'View broker info',
            propertyId: property.Id,
          }),
        },
        {
          type: 'postback',
          title: 'Contact me',
          value: JSON.stringify({
            text: 'Contact me',
            propertyId: property.Id,
          }),
        },
      ],
    })
  })
  return {
    type: 'carouselle',
    content: elements,
  }
}


exports.formatAppointment = (property) => {
  const options = [
    `${moment().add(1, 'days').format('dddd MMM Do')} at 10am`,
    `${moment().add(2, 'days').format('dddd MMM Do')} at 9am`,
    `${moment().add(2, 'days').format('dddd MMM Do')} at 5pm`,
    `${moment().add(3, 'days').format('dddd MMM Do')} at 1pm`,
    `${moment().add(3, 'days').format('dddd MMM Do')} at 6pm`,
  ]
  return {
    type: 'card',
    content: {
      title: `Select one of the available appointments below at ${property.get('Address__c')} in ${property.get('City__c')}.`,
      buttons: [
        {
          type: 'postback',
          title: options[0],
          value: JSON.stringify({
            text: `Confirm visit, ${property.get('Address__c')} in ${property.get('City__c')}, ${options[0]}`,
            propertyId: property.getId(),
            date: options[0],
            city: property.get('City__c'),
          }),
        },
        {
          type: 'postback',
          title: options[1],
          value: JSON.stringify({
            text: `Confirm visit, ${property.get('Address__c')} in ${property.get('City__c')}, ${options[1]}`,
            propertyId: property.getId(),
            date: options[1],
            city: property.get('City__c'),
          }),
        },
        {
          type: 'postback',
          title: options[2],
          value: JSON.stringify({
            text: `Confirm visit, ${property.get('Address__c')} in ${property.get('City__c')}, ${options[2]}`,
            propertyId: property.getId(),
            date: options[2],
            city: property.get('City__c'),
          }),
        },
      ],
    },
  }
}

exports.formatBroker = (payload) => {
  const elements = {
    title: 'Caroline Kingsley',
    subtitle: 'Senior Broker  · 617-219-6363 · ckingsley@dreamhouse.com',
    imageUrl: 'https://s3-us-west-1.amazonaws.com/sfdc-demo/messenger/caroline_500x260.png',
    buttons: [
      {
        type: 'postback',
        title: 'Contact Me',
        value: JSON.stringify({
          text: 'Contact me',
          propertyId: payload.properyId,
        }),
      },
    ],
  }
  return {
    type: 'card',
    content: elements,
  }
}

/* module improts */
import handleAction from './actions'
import uploads from './uploads'
import { Client } from 'recastai'

const req = new request(process.env.REQUEST_TOKEN, process.env.LANGUAGE)

export async function replyMessage(message) {
  console.log('\n**********************************************************')
  try {
    console.log('MESSAGE RECEIVED', message)

    let text = message.content
    const { senderId } = message

    let payload = ''
    let replies = []
    if (message.content.attachment.type === 'picture') {
      replies = await uploads(message.content.attachment)
    } else {
      if (message.content.attachment.type === 'payload') {
        payload = JSON.parse(message.content.attachment.content)
        text = payload.text
      } else {
        text = message.content.attachment.content
      }
      const res = await req.converseText(text, { conversationToken: senderId })
      console.log('RECAST ANSWER', res)
      replies = await handleAction(res, payload)
    }
    replies.forEach(reply => message.addReply(reply))

    await message.reply()
  } catch (err) {
    console.error('An error occured while handling message', err)
  }
  console.log('**********************************************************\n')
}

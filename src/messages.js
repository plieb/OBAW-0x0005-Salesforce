/* module improts */
import handleAction from './actions'
import uploads from './uploads'
import { request } from 'recastai'

const req = new request(process.env.REQUEST_TOKEN, process.env.LANGUAGE)

export async function replyMessage(message) {
  console.log('\n**********************************************************')
  try {
    console.log('MESSAGE RECEIVED', message)

    let text = message.content
    const { senderId } = message

    let payload = ''
    let replies = []
    if (message.type === 'picture') {
      replies = await uploads(message.attachment)
    } else {
      if (message.type === 'payload') {
        payload = JSON.parse(message.content)
        text = payload.text
      } else {
        text = message.content
      }
      const res = await req.converseText(text, { conversationToken: senderId })
      console.log('RECAST ANSWER', res)
      replies = await handleAction(res, payload, message)
      replies.forEach(reply => message.addReply(reply))
    }

    await message.reply()
  } catch (err) {
    console.error('An error occured while handling message', err)
  }
  console.log('**********************************************************\n')
}

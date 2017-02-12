/* module improts */
import { Client } from 'recastai'
import handleAction from './actions'
import uploads from './uploads'

const recastClient = new Client(process.env.RE_BOT_TOKEN)

export async function handleMessage(message) {
  console.log('\n**********************************************************')
  try {
    console.log('MESSAGE RECEIVED', message)

    let text = ''
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
      const { senderId } = message
      const res = await recastClient.textConverse(text, { conversationToken: senderId })
      replies = await handleAction(res, payload, message)
    }
    replies.forEach(reply => message.addReply(reply))

    await message.reply()
  } catch (err) {
    console.error('An error occured while handling message', err)
  }
  console.log('**********************************************************\n')
}

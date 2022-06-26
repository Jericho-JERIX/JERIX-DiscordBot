const axios = require('axios')
const {postMessage} = require('../service/Message')
const {getSpecial} = require('./DiscordSpecialTag')


module.exports = {
    execute: async function(message){
        let special = getSpecial(message.content)
        let attachments_res = message.attachments.map(attach => attach.attachment)

        let sample = {
            username: message.author.username,
            uid: message.author.id,
            channel: message.channelId,
            content: message.content,
            emoji: special.emoji,
            mentions_user: special.mentions_user,
            mentions_channel: special.mentions_channel,
            mentions_role: special.mentions_role,
            message_id: message.id,
            attachments: attachments_res
        }
        postMessage(sample)
    }
}
const {Client,Intents} = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready',()=>{
    console.log("Going Live...")
})

client.login(process.env.TOKEN)

// Command
client.on('messageCreate',(message)=>{
    const Prefix = "j!"
    var arg = message.content.split(' ')

    if(arg[0].slice(0,2) == Prefix){
        var command = arg[0].slice(2)
        switch(command){

            case "p":
            case "ping":
                message.channel.send("<:sad_cat:806181269456027648>")
                break

        }
    }
})
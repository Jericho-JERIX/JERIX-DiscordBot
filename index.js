const {Client,Intents,MessageButton,MessageActionRow, Message} = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')

const BtnEvent = require('./module/ButtonEvent')
const ChoiceMatter = require('./module/ChoiceMatter')
const HL = require('./module/HomeworkList')
const RandomKit = require('./module/RandomKit')
const WordFinderTH = require('./module/WordFinderTH')
const Today = require('./module/Today')
const { time } = require('console')

const Counter = new BtnEvent.Counter()
const ChoiceGame = new ChoiceMatter.Graph()
const HomeworkList = new HL.HomeworkList()


const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
})

client.on('ready',(test)=>{
    console.log("Going Live...")
    var Bot_count = 0
    setInterval(()=>{
        client.user.setPresence({
            activities : [{
                name: `Online for ${Bot_count} minutes!`,
                type: "PLAYING"
            }]
        })
        Bot_count+= 1
    },60000)

    var timeCount = setInterval(()=>{
        var timeNow = new Today.AtThisTime()
        if(timeNow.hour == 7 && timeNow.minute == 0){
            var msg = await client.channels.cache.get('885898083295186944').send(HomeworkList.list())
            msg.crosspost()
            setInterval(async ()=>{
                var msg = await client.channels.cache.get('885898083295186944').send(HomeworkList.list())
                msg.crosspost()
            },86400000)
            clearInterval(timeCount)
        }
    },1000)
    
    
    
})
client.login(process.env.TOKEN)



//TODO General User Command

const CommandList = fs.readdirSync('commands')
var Command = {}

for(var i in CommandList){
    Command[CommandList[i].slice(0,-3)] = require(`./commands/${CommandList[i].slice(0,-3)}`)
}

var Prefix = "b!"
client.on('messageCreate',(message)=>{
    var arg = message.content.split(' ')

    if(arg[0].slice(0,2) == Prefix){
        var command = arg[0].slice(Prefix.length)
        for(var i in Command){
            if(Command[i].name == command || Command[i].alias.includes(command)){
                Command[i].execute(message,arg)
                break
            }
        }
    }
})

//! Super-User(ADMIN) Command
client.on('messageCreate',(message)=>{
    if(message.author.bot) return
    var arg = message.content.split(' ')
    if(arg[0].slice(0,2) == Prefix){
        var command = arg[0].slice(2)
        if(message.member.roles.cache.some(role => role.id == 569178222495793153)){
            switch(command){

                case "clear": // Clear Message
                    message.channel.bulkDelete(parseInt(arg[1]) + 1)
                    break

                case "prefix":
                    Prefix = arg[1]
                    message.channel.send(`My Prefix has been set to \`${Prefix}\``)
            }
        }
        else{
            message.channel.send(`You Don't Have Permission To Execute \`${arg[0]}\` Command!`)
        }
    }
})

// D-Tong
const TongDick = ['ควย','หำ','หรรม','hum']
const Friend = ['ฝ้าย','เนส','ตุล','นัน','นีน่า','กานน']
var foundDick = false
var foundFriend = false
client.on('messageCreate',(message)=>{
    foundDick = false
    foundFriend = false
    for(var i in TongDick){
        if(WordFinderTH.findThaiWord(message.content,TongDick[i])){
            foundDick = true
            break
        }
    }

    for(var i in Friend){
        if(WordFinderTH.findThaiWord(message.content,Friend[i])){
            foundFriend = true
            break
        }
    }

    if(foundDick){
        if(foundFriend){
            message.channel.send('<@!732085397299134487> ไม่ มึงอ่ะเล็ก')
        }
        else{
            message.channel.send('<@!732085397299134487> เล็ก')
        }
    }
})

//* Button Event
client.on('interactionCreate',(interact)=>{
    if(interact.isButton()){
        var arg = interact.customId.split('-')
        switch(arg[0]){
            case "counter":
                if(arg[1]=='inc') Counter.increment()
                else if(arg[1]=='dec') Counter.decrement()
                else Counter.reset()
                interact.message.edit(String(Counter.count))
                break

            case "homeworklist":
                interact.message.edit(HomeworkList.list(arg[1]))
                break
        }
    }
})
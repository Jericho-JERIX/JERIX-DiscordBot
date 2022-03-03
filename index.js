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
const {getLED,postLED} = require('./service/LED')

const Counter = new BtnEvent.Counter()
// const ChoiceGame = new ChoiceMatter.Graph()
// var HomeworkList = new HL.HomeworkList()

//TODO--- User Command ---
const CommandList = fs.readdirSync('commands')
var Command = {}

for(var i in CommandList){
    Command[CommandList[i].slice(0,-3)] = require(`./commands/${CommandList[i].slice(0,-3)}`)
}

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

    var timeCount = setInterval(async ()=>{
        var timeNow = new Today.AtThisTime()
        if(timeNow.hour == 0 && timeNow.minute == 1){
            var msg = await client.channels.cache.get('885898083295186944').send({content:`${Command.homework.getList('ALL')}`,components: [Command.homework.getButton()]})
            msg.crosspost()
            setInterval(async ()=>{
                var msg = await client.channels.cache.get('885898083295186944').send({content:`${Command.homework.getList('ALL')}`,components: [Command.homework.getButton()]})
                msg.crosspost()
            },86400000)
            clearInterval(timeCount)
        }
    },1000) 
})
client.login(process.env.TOKEN)

var Prefix = "b!"
client.on('messageCreate',(message)=>{
    var arg = message.content.split(' ')
    if(arg[0].slice(0,2) == Prefix){
        var command = arg[0].slice(Prefix.length)
        var result = -1
        var executable = false
        for(var i in Command){
            if(Command[i].name == command || Command[i].alias.includes(command)){

                if(Command[i].roleRequirement.length == 0){
                    executable = true
                }
                else{
                    for(var j in Command[i].roleRequirement){
                        if(message.member.roles.cache.some(role => role.id == Command[i].roleRequirement[j])){
                            executable = true
                            break
                        }
                    }
                }

                if(executable){
                    result = Command[i].execute(message,arg)
                }
                else{
                    result = 2
                }
                break
            }
        }

        /* Command Result / Special Execute
           -1 - No Command Found
            0 - Success
            1 - Error(Bad Input)
            2 - Permission Required
        */
        if(result == -1 || result == 0) {}
        else if(result == 1){message.channel.send("Something went Wrong! Please try again")}
        else if(result == 2){message.channel.send("You need Permission!")}
        else if(result[0] == "PREFIX") Prefix = result[1]
    }
})

var tagged_channel_id = []
client.on('messageCreate',async (message) =>{
    var led_data = await getLED()
    if(message.author.id == 226919303700676610 || message.author.id == 931177284616986705){
        if(tagged_channel_id.includes(message.channelId)){
            for(var i=0;i<tagged_channel_id.length;i++){
                if(tagged_channel_id[i] == message.channelId){
                    tagged_channel_id.splice(i,i)
                    break;
                }
            }
        }
        if(tagged_channel_id.length == 0){
            led_data.led5[0] = false
            led_data.led5[4] = false
            postLED(led_data.led5)
        }
        led_data.led5[1] = false
        led_data.led5[3] = false
        postLED(led_data.led5)
    }
    else if(message.content.includes('<@!226919303700676610>') || message.content.includes('<@!931177284616986705>')){
        led_data.led5[0] = true
        led_data.led5[4] = true
        tagged_channel_id.push(message.channelId)
        postLED(led_data.led5)
    }
    else{
        led_data.led5[1] = true
        led_data.led5[3] = true
        postLED(led_data.led5)
    }
    
})

// D-Tong
// const TongDick = ['ควย','หำ','หรรม','hum']
// const Friend = ['ฝ้าย','เนส','ตุล','นัน','นีน่า','กานน']
// var foundDick = false
// var foundFriend = false
// client.on('messageCreate',(message)=>{
//     foundDick = false
//     foundFriend = false
//     for(var i in TongDick){
//         if(WordFinderTH.findThaiWord(message.content,TongDick[i])){
//             foundDick = true
//             break
//         }
//     }

//     for(var i in Friend){
//         if(WordFinderTH.findThaiWord(message.content,Friend[i])){
//             foundFriend = true
//             break
//         }
//     }

//     if(foundDick){
//         if(foundFriend){
//             message.channel.send('<@!732085397299134487> ไม่ มึงอ่ะเล็ก')
//         }
//         else{
//             message.channel.send('<@!732085397299134487> เล็ก')
//         }
//     }
// })

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
                // interact.message.edit(HomeworkList.list(arg[1]))
                interact.message.edit(Command.homework.getList(arg[1]))
                break
        }
    }
})

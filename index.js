const {Client,Intents,MessageButton,MessageActionRow, Message} = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')


const BtnEvent = require('./module/ButtonEvent')
const ChoiceMatter = require('./module/ChoiceMatter')
const HL = require('./module/HomeworkList')
const RandomKit = require('./module/RandomKit')
const WordFinderTH = require('./module/WordFinderTH')

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

client.on('ready',()=>{
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
    
})
client.login(process.env.TOKEN)

var jRandom = {
    user: []
}

// General User Command

const Prefix = "b!"
client.on('messageCreate',(message)=>{
    var arg = message.content.split(' ')

    if(arg[0].slice(0,2) == Prefix){
        var command = arg[0].slice(2)
        switch(command){

            case "p":
            case "ping":
                // Command.ping.execute(message)
                message.channel.send("<:sad_cat:806181269456027648>")
                break

            case "hw":

                if(isNaN(Number(arg[2])) && isNaN(Number(arg[3]))){
                    message.channel.send(`Invalid Input!`)
                }

                // Button
                var button = new MessageActionRow().addComponents(
                    new MessageButton().setLabel("📋 All").setStyle("SECONDARY").setCustomId("homeworklist-ALL"),
                    new MessageButton().setLabel("📝 Assignment").setStyle("PRIMARY").setCustomId("homeworklist-Assignment"),
                    new MessageButton().setLabel("🔔 Alert").setStyle("SUCCESS").setCustomId("homeworklist-Alert"),
                    new MessageButton().setLabel("🔥 Exam").setStyle("DANGER").setCustomId("homeworklist-Exam")
                )

                if(arg[1]=="add" || arg[1] == "alert" || arg[1] == "exam"){
                    
                    var formatPara = []
                    if(Number(arg[2])<10){arg[2] = `0${arg[2]}`}
                    if(Number(arg[3])<10){arg[3] = `0${arg[3]}`}
                    for(var i=2;i<arg.length;i++){
                        formatPara.push(arg[i])
                    }

                    var add_type = "Assignment"
                    if(arg[1] == "alert"){add_type = "Alert"}
                    else if(arg[1] == "exam"){add_type = "Exam"}

                    message.channel.send({content: HomeworkList.add(formatPara,true,"0000",true,add_type),components: [button]})
                    
                    if(arg[2]=="u" && message.channel.id != "885898083295186944"){
                        message.guild.channels.cache.get("885898083295186944").message.channel.send(HomeworkList.list())
                    }
                }
                else if(arg[1]=="list"){
                    message.channel.send({content: HomeworkList.list(),components: [button]})
                }
                else if(arg[1]=="delete"){
                    message.channel.send({content: HomeworkList.delete(arg[2]),components: [button]})
                }
                else if(arg[1]=="edit"){
                    message.channel.send({content: HomeworkList.edit(arg[2],arg[3],arg[4]),components: [button]})
                }
                if(message.channel.id == "862013848943722506"){
                    if(!HomeworkList.remaining()){
                        message.channel.setName(`📝ไม่มีงานเย้ๆ`)
                    }
                    else{
                        message.channel.setName(`📝homework-${HomeworkList.remaining()}-left`)
                    }
                }
                break

            case "clear": // Clear Message
                if(message.member.roles.cache.has("569178222495793153")){
                    message.channel.bulkDelete(parseInt(arg[1]) + 1)
                }
                else{
                    message.channel.send("อย่าหาทำ")
                }
                break
            
            case "gpa":
                message.channel.bulkDelete(1)
                var tCredit = 0
                var tGrade = 0
    
                var isnotGrade = false
                var tNCredit = 0
                var bestGrade = 0
                var worstGrade = 0
    
                var grader = {
                    char:['A','B+','B','C+','C','D+','D','F'],
                    grade:[4,3.5,3,2.5,2,1.5,1,0]
                }
    
                for(i=1;i<arg.length;i+=2){ // 3 A 4 B
                    tCredit += Number(arg[i])
                    tNCredit += Number(arg[i])
                    if(arg[i+1] == "N"){
                        isnotGrade = true
                        tCredit -= Number(arg[i])
                        bestGrade += Number(arg[i])*4
                        worstGrade += Number(arg[i])*0
                    }
                    else{
                        for(j=0;j<grader.char.length;j++){
                            if(arg[i+1] == grader.char[j] || arg[i+1] == grader.grade[j]){
                                tGrade += grader.grade[j]*Number(arg[i])
                                bestGrade += grader.grade[j]*Number(arg[i])
                                worstGrade += grader.grade[j]*Number(arg[i])
                            }
                        }
                    }
                }
    
                var gpa = tGrade/tCredit
                var bestGpa = bestGrade/tNCredit
                var worstGpa = worstGrade/tNCredit
    
                // message.author.send(`📁 \`Best GPA:\` **${Number(bestGpa).toFixed(2)}**\n📊 \`Worst GPA:\` **${Number(worstGpa).toFixed(2)}**`)
    
                if(tCredit/tCredit != 1 || gpa/gpa != 1){
                    Send(`**[SYNTAX]** j!gpa \`<sub#1 Credit>\` \`<sub#1 Grade>\` \`<sub#2 Credit>\` \`<sub#2 Grade>\` ...\n__**Example**__:  j!gpa 3 B+ 2 A`)
                }
                else{
                    Send("*Your grade has been sent.*")
                    message.author.send("==================")
                    message.author.send(`> 📁 \`Total Credit:\` **${tNCredit.toFixed(1)}**\n> 📊 \`Current GPA:\` ||**${Number(gpa).toFixed(2)}**||`)
                    if(isnotGrade){
                        message.author.send(`> 📈 \`Comeback GPA:\` ||**${Number(bestGpa).toFixed(2)}**||\n> 📉 \`Choked GPA:\` ||**${Number(worstGpa).toFixed(2)}**||`)
                    }
                    message.author.send("==================")
                }
                break
                
            case "counter":
                Counter.reset()
                var button = new MessageActionRow().addComponents(
                    new MessageButton().setLabel("-").setStyle("PRIMARY").setCustomId("counter-dec"),
                    new MessageButton().setLabel("+").setStyle("PRIMARY").setCustomId("counter-inc"),
                    new MessageButton().setLabel("Reset").setStyle("PRIMARY").setCustomId("counter-rst")
                )
                message.channel.send({content: "0",components: [button]})
                break;

            case "edit":
                message.channel.send("Check")
                message.edit("EDITED")
                break

            case "c":
                ChoiceGame.go(ChoiceGame.choice[Number(arg[1])])
                ChoiceGame.show()
                if(ChoiceGame.ending){
                    ChoiceGame = new ChoiceMatter.Graph()
                }
                break

            case "random":
                var i = 0
                if(arg.length==1){
                    i = Math.floor(Math.random()*jRandom.user.length)
                    message.channel.send(`**Congratulations!!** >>> ${jRandom.user[i]} <<< You're The **Lucky** One!!!`)
                }
                else if(arg[1] == "add"){
                    for(j=2;j<arg.length;j++){
                        jRandom.user.push(arg[j])
                    }
                }
                else{
                    i = 0
                    while(i==0){
                        i = Math.floor(Math.random()*arg.length)
                    }
                    message.channel.send(`**Congratulations!!** >>> ${arg[i]} <<< You're The **Lucky** One!!!`)
                    for(i=1;i<arg.length;i++){
                        jRandom.user.push(arg[i])
                    }
                    // console.log(jRandom.user)
                }
                break

            case "shuffle":
                var box = []
                for(var i=1;i<arg.length;i++){
                    box.push(arg[i])
                }
                RandomKit.shuffle(box)

                var format_string = ""
                for(var i=0;i<box.length;i++){
                    format_string += `${box[i]}\n`
                }
                Send(format_string)
                break

            case "pair":
                if(arg.length %2 == 0){
                    Send("Can't Match!")
                    break
                }
                var div = Math.ceil(arg.length/2)
                var box1 = []
                var box2 = []
                for(var i=1;i<div;i++){
                    box1.push(arg[i])
                }
                for(var i=div;i<arg.length;i++){
                    box2.push(arg[i])
                }
                RandomKit.shuffle(box1)
                RandomKit.shuffle(box2)
                var format_string = ""
                for(var i=0;i<box1.length;i++){
                    format_string += `${box1[i]} ---> ${box2[i]}\n`
                }
                message.channel.send(format_string)
                break

        }
    }
})

client.on('guildMemberAdd',(newbie)=>{
    console.log("Nice")
    console.log(newbie)
})

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

// Trolling Friend
// client.on('typingStart',(message)=>{
//     if(message.user.id != 226919303700676610){
//         message.channel.send(`<@!${message.user.id}> จะพิมพ์ไร`)
//     }
// })
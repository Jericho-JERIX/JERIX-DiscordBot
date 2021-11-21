const {Client,Intents} = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_INVITES
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
                message.channel.message.channel.send("<:sad_cat:806181269456027648>")
                break

            case "hw":
                var HomeworkList = require('./module/HomeworkList').HomeworkList
                HomeworkList.readFile()
                if(arg[1]=="add"){
                    var formatPara = []
                    if(Number(arg[2])<10){arg[2] = `0${arg[2]}`}
                    if(Number(arg[3])<10){arg[3] = `0${arg[3]}`}
                    for(var i=2;i<arg.length;i++){
                        formatPara.push(arg[i])
                    }
                    message.channel.send(HomeworkList.addHomework(formatPara))
                    if(arg[2]=="u" && message.channel.id != "885898083295186944"){
                        message.guild.channels.cache.get("885898083295186944").message.channel.send(HomeworkList.listHomework())
                    }
                }
                else if(arg[1]=="list"){
                    message.channel.send(HomeworkList.listHomework())
                }
                else if(arg[1]=="delete"){
                    message.channel.send(HomeworkList.deleteHomework(arg[2]))
                }
                else if(arg[1]=="edit"){
                    message.channel.send(HomeworkList.editHomework(arg[2],arg[3],arg[4]))
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
                
        }
    }
})

client.on('inviteCreate',(invite)=>{
    console.log(invite)
})

// Trolling Friend
// client.on('typingStart',(message)=>{
//     if(message.user.id != 226919303700676610){
//         message.channel.send(`<@!${message.user.id}> จะพิมพ์ไร`)
//     }
// })
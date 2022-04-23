const {NextLevelXO,getMatch,getNXOData,createMatch} = require('../module/NextLevelXO')
const {getSpecial} = require('../module/DiscordSpecialTag')

var NXO;

module.exports = {
    name: "nextlevelxo",
    alias: ['nextlevelxo','nxo'],
    roleRequirement: [],
    execute: async function(message,arg){
        switch(arg[1]){
            case 'create':
                var p2_uid = arg[2].slice(2,-1)
                var p2_username = message.guild.members.cache.get(p2_uid).user.username
                var match = await createMatch(message.author.id,message.author.username,p2_uid,p2_username)
                if(match.result == 0){
                    NXO = new NextLevelXO(match.data)
                }
                message.channel.send(NXO.showBoard())
                message.channel.send(`Player #${NXO.turn+1} <@${NXO.player[NXO.turn].uid}> Start`)
                break
            case 'play':
                var match_result = await getMatch(message.author.id)
                if(match_result.status != 0){
                    message.channel.send(`User not found!`)
                    break
                }
                NXO = new NextLevelXO(match_result.data)
                if(Number(arg[2]) <= 0 || Number(arg[2]) > 3 || Number(arg[3]) <= 0 || Number(arg[3]) > 3 || Number(arg[4]) <= 0 || Number(arg[4]) > 5){
                    message.channel.send(`Error Input`)
                }
                var result = NXO.placeBlock(Number(arg[2])-1,Number(arg[3])-1,Number(arg[4])-1)
                if(result == -1){
                    message.channel.send(`That place is already taken try again!`)
                }
                else{
                    message.channel.send(NXO.showBoard())
                    NXO.endgame()
                    if(result == 1 || result == 2){
                        message.channel.send(`Player #${result} WIN!`)
                    }
                    else if(result == 3){
                        message.channel.send("DRAW!")
                    }
                }
                if(result < 1){
                    message.channel.send(`Player #${NXO.turn+1} <@${NXO.player[NXO.turn].uid}> Turn`)
                }
                NXO.updateMatchStatus()
                break
        }
        return 0
    }
}
const {NextLevelXO} = require('../module/NextLevelXO')
const {getSpecial} = require('../module/DiscordSpecialTag')

var NXO = new NextLevelXO('AAA','AAA','BBB','BBB')

module.exports = {
    name: "nextlevelxo",
    alias: ['nextlevelxo','nxo'],
    roleRequirement: [],
    execute: function(message,arg){
        switch(arg[1]){
            case 'create':
                // var opp = arg[2].slice(2,-1)
                NXO = new NextLevelXO('A','A','B','B')
                message.channel.send(NXO.showBoard())
                message.channel.send(`Player #${NXO.turn+1} Turn`)
                break
            
            case 'play':
                if(Number(arg[2]) <= 0 || Number(arg[2]) > 3 || Number(arg[3]) <= 0 || Number(arg[3]) > 3 || Number(arg[4]) <= 0 || Number(arg[4]) > 5){
                    message.channel.send(`Error Input`)
                }
                var result = NXO.placeBlock(Number(arg[2])-1,Number(arg[3])-1,Number(arg[4])-1)
                if(result == -1){
                    message.channel.send(`That place is already taken try again!`)
                }
                else{
                    message.channel.send(NXO.showBoard())
                    if(result == 1 || result == 2){
                        message.channel.send(`Player #${NXO.turn} WIN!`)
                    }
                    else if(result == 3){
                        message.channel.send("DRAW!")
                    }
                }
                message.channel.send(`Player #${NXO.turn+1} Turn`)
                break
        }
        return 0
    }
}
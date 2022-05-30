const fs = require("fs")

function getYearData(discord){
    var json_data = JSON.parse(fs.readFileSync("./module/resource/jerichoyeardiv.json",'utf-8')).data
    var result = []
    for(var i in json_data){
        result.push({
            "timestamp": json_data[i].timestamp,
            "role": discord.guild.roles.cache.get(json_data[i].roleid)
        })
    }
    return result
}

module.exports = {
    execute: function(before){
        const JerichoYear = getYearData(before)
        for(var i in JerichoYear){
            if(before.member.joinedTimestamp < JerichoYear[i].timestamp && before.member.roles.cache.has("409027862826319874")){
                before.member.roles.add(JerichoYear[i].role).catch(console.error)
                break
            }
        }
    }
}
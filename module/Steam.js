const axios = require('axios')
const API_KEY = "03FCAF73A639E717570C27051B4087D4"

function intersection(a,b){
    let result = []
    for(var i in a){
        if(b.includes(a[i]) && !result.includes(a[i])){
            result.push(a[i])
        }
    }
    for(var i in b){
        if(a.includes(b[i]) && !result.includes(b[i])){
            result.push(b[i])
        }
    }
    return result
}

async function getUserStat(appid,steamid){
    const { data } = await axios.get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${API_KEY}&steamid=${steamid}`)
    return data.playerstats
}

async function getOwnGame(steamid){
    const { data } = await axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamid}&format=json`)
    return data.response
}

async function getOwnGameId(steamid){
    const response = await getOwnGame(steamid)
    let result = []

    for(var i in response.games){
        result.push(String(response.games[i].appid))
    }
    return result
}

async function getGameName(appid,steamid){
    const response = await getUserStat(appid,steamid).catch((err)=>{})
    try{
        return response.gameName
    }
    catch(err){
        return String(appid)
    }
}

module.exports = {
    getSameGame: async function(steamid1,steamid2){
        let user1_appids = await getOwnGameId(steamid1)
        let user2_appids = await getOwnGameId(steamid2)

        let sameGames = intersection(user1_appids,user2_appids)
        let sameGamesName = []

        for(var i in sameGames){
            var gameName = await getGameName(sameGames[i],steamid1)
            if(gameName != ''){
                sameGamesName.push(gameName)
            }
        }
        return sameGamesName
    }
}
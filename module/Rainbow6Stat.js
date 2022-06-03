const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config() 
const Authorization = {
    "headers": {
        "Authorization": process.env.Rainbow6Stat_Auth,
    }
}

class Rainbow6Stat{
    constructor(){
        this.x = "HHH"
    }

    async getGenericStats(username){
        const response = await axios.get(`https://api2.r6stats.com/public-api/stats/${username}/pc/generic`,Authorization)
        return response.data
    }
}

(async()=>{
    var R6S = new Rainbow6Stat()
    var x = await R6S.getGenericStats("KanonKC")
    console.log(x)
})()

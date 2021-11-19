const axios = require('axios')

const Rainbow6Stat = {
    getGenericStats: function(username){
        axios
            .get(`https://api2.r6stats.com/public-api/stats/${username}/pc/generic`, {
                headers: {
                Authorization: 'Bearer 8b628688-7c76-4e2c-b2e3-b870fb01b1e7',
                }
            })
            .then((gen) => {console.log(gen)})
    }
}

Rainbow6Stat.getGenericStats("KanonKC")
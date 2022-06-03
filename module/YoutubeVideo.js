const axios = require("axios")

async function getYoutubeVideo(search){
    const { data } = await axios.get(`http://localhost:8000/youtube/${search}`)
    if(data.status < 400){
        return data.data
    }
    return []
}

// (async()=>{
    
//     const x = await axios.get(encodeURI(`http://localhost:8000/youtube/เพลง`))
//     console.log(x.data.data)
// })()

module.exports = {
    execute: async function(message){
        getYoutubeVideo(encodeURI(message.content))
            .then((result)=>{
                message.channel.send(result[0].url)
            })
            .catch((err)=>{})
        
    }
}
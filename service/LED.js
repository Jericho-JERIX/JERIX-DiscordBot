const axios = require('axios')
const IP_ADDRESS = 'http://192.168.0.14:8000'

async function getLED(){
    const response = await axios.get(IP_ADDRESS)
    return response.data
}

async function postLED(arr){
    axios.post(IP_ADDRESS,{
        'led1': arr[0],
        'led2': arr[1],
        'led3': arr[2],
        'led4': arr[3],
        'led5': arr[4]
    })
}



(async ()=>{
    // var data = await getLED()
    // console.log(data)
    postLED([false,false,false,false,false])
})()

module.exports = {
    getLED,postLED
}
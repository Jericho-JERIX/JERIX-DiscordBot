const axios = require('axios')
const IP_ADDRESS = "http://localhost:8000/message"

async function getMessage(){
    const response = await axios.get(IP_ADDRESS)
    return response.data
}

async function postMessage(completeObj){
    const response = await axios.post(IP_ADDRESS,completeObj)
    return response
}

module.exports = {
    getMessage,postMessage
}
const { default: axios } = require("axios");
const { BACKEND_URL } = require("./services/constant.service");
const HOMEWORKLIST_URL = `${BACKEND_URL}/api/homeworklist`

// const getAllHomeworks = async (channel_id) => {
//     return axios.get(`${HOMEWORKLIST_URL}/channel/${channel_id}`)
// }
//http://localhost:8000/api/homeworklist/channel/12345
// (async ()=>{
    
//     // console.log(x)
// })()

axios.get('http://127.0.0.1:8000/api/greeting').then(response => {
        console.log(response)
    })
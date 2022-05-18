const axios = require('axios')


(async()=>{
    const HOMEWORK_API = "http://localhost:8000/homeworklist"
    const filename = "cpe-homework"
    const response = await axios.get(`${HOMEWORK_API}/${filename}`)
    console.log(response)
})()
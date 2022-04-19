const axios = require('axios')

axios.post('https://maker.ifttt.com/trigger/test/json/with/key/dKWpvocK7ojXqfgBqLh3nc',{data:true}).then((data)=>{
    console.log(data)
})
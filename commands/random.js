var jRandom = {
    user: []
}
module.exports = {
    name: "random",
    alias: [],
    execute: function(message,arg){
        var i = 0
        if(arg.length==1){
            i = Math.floor(Math.random()*jRandom.user.length)
            message.channel.send(`**Congratulations!!** >>> ${jRandom.user[i]} <<< You're The **Lucky** One!!!`)
        }
        else if(arg[1] == "add"){
            for(j=2;j<arg.length;j++){
                jRandom.user.push(arg[j])
            }
        }
        else{
            i = 0
            while(i==0){
                i = Math.floor(Math.random()*arg.length)
            }
            message.channel.send(`**Congratulations!!** >>> ${arg[i]} <<< You're The **Lucky** One!!!`)
            for(i=1;i<arg.length;i++){
                jRandom.user.push(arg[i])
            }
        }
    }
}
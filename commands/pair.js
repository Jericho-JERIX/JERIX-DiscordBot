const RandomKit = require('../module/RandomKit')

module.exports = {
    name: "pair",
    alias: [],
    execute: function(message,arg){
        if(arg.length %2 == 0){
            message.channel.send("Can't Match!")
            return
        }
        var div = Math.ceil(arg.length/2)
        var box1 = []
        var box2 = []
        for(var i=1;i<div;i++){
            box1.push(arg[i])
        }
        for(var i=div;i<arg.length;i++){
            box2.push(arg[i])
        }
        RandomKit.shuffle(box1)
        RandomKit.shuffle(box2)
        var format_string = ""
        for(var i=0;i<box1.length;i++){
            format_string += `${box1[i]} ---> ${box2[i]}\n`
        }
        message.channel.send(format_string)
    }
}
const RandomKit = require('../module/RandomKit')

module.exports = {
    name: "shuffle",
    alias: [],
    execute: function(message,arg){
        var box = []
        for(var i=1;i<arg.length;i++){
            box.push(arg[i])
        }
        RandomKit.shuffle(box)

        var format_string = ""
        for(var i=0;i<box.length;i++){
            format_string += `${box[i]}\n`
        }
        message.channel.send(format_string)
    }
}
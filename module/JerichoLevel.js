const Discord = require("discord.js")
const fs = require('fs')

var JerichoLevel = {
    uid: "",
    color: "#00a2ff",
    level: 1,
    exp: 0,
    maxExp: 10000,
    
    userTimeStamp: {},
    onlineTimeStamp: 0,

    getData: function(discordId){
        try{
            let data = fs.readFileSync(`Level\\${discordId}.json`,'utf8',(err)=>{console.log("Help")}).split(' ')
            this.level = Number(data[0])
            this.exp = Number(data[1])
            this.uid = discordId
            // console.log("Done")
        }
        catch(err){
            fs.writeFile(`Level\\${discordId}.json`,'1 0',(err)=>{})
            this.getData(this.uid)
            // console.log("Wrote")
        }
    },

    addExp: function(amount){
        // console.log(`${this.uid} ${this.exp}`)
        this.exp += amount
        while(this.exp >= this.maxExp){
            this.exp -= this.maxExp
            this.level += 1
        }
        this.saveData(this.uid)
    },

    saveData: function(discordId=uid){
        fs.writeFile(`Level\\${discordId}.json`,`${this.level} ${this.exp}`,(err)=>{})
    },

    showData: function(){
        var progressBar = ""
        for(var i=1;i<=10;i++){
            if(i <= Math.floor(this.exp*10/this.maxExp)){
                progressBar += ":blue_square: "
            }
            else{
                progressBar += ":white_large_square: "
            }
        }
        var formatEmbed = new Discord.MessageEmbed()
            .setColor(this.color)
            .setTitle(`Level: ${this.level}`)
            .addField(`EXP: ${this.exp}/${this.maxExp} (${(this.exp/this.maxExp*100).toFixed(2)} %)`,progressBar)
        return formatEmbed
    },

}

module.exports = {
    JerichoLevel
}
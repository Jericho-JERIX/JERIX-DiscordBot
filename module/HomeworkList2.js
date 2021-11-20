const { prototype } = require("events")
const fs = require("fs")
const DataPath = "C:\\Users\\User\\Documents\\Abstract Dimension\\JERIX2\\module\\"
const DayName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

class Homework{
    constructor(id,date,label){
        this.isValid = true
        this.id = id
        this.date = date
        this.label = label
        
        this.day_name = DayName[new Date(date[2],date[1]-1,date[0]).getDay()]
        this.timestamp = new Date(date[2],date[1]-1,date[0],23,59,59).getTime()
        this.day_left = Math.floor((this.timestamp-Date.now())/86400000)

        this.alert_icon = "⚫"
        if(this.day_left <= 2){this.alert_icon = "⭕"}
        else if(this.day_left <= 5){this.alert_icon = "🟡"}
        else if(this.day_left <= 7){this.alert_icon = "🔵"}

        if(this.day_left < 0 || !this.label || this.date == 99 || isNaN(this.timestamp)){this.isValid = false}
    }
}

Homework.prototype.valueOf = function(){return this.timestamp}

class HomeworkList{
    constructor(file){
        this.data = []
        var raw_data = fs.readFileSync(`${DataPath}resource\\${file}`,'utf8').split('\n')
        for(var i=0;i<raw_data.length;i++){
            var spt_data = raw_data[i].split(' ')
            // console.log(spt_data)
            var instance = new Homework(spt_data[0],[Number(spt_data[1]),Number(spt_data[2]),2021],spt_data[4])
            if(instance.isValid){
                this.data.push(instance)
            }
        }
    }
}

var hl = new HomeworkList('homeworklist.txt')
console.log(hl)


const { prototype } = require("events")
const fs = require("fs")
// const DataPath = "C:\\Users\\User\\Documents\\Abstract Dimension\\JERIX2\\module\\"
const DataPath = "C:\\Users\\ASUS S430UN\\Documents\\JERIX-V2\\module\\"
const DayName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

class Homework{
    constructor(id,date,label){
        this.isValid = true     // Boolean
        this.id = id            // String
        this.date = date        // Integer [Array]
        this.label = label      // String
        
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
            var homework = new Homework(spt_data[0],[Number(spt_data[1]),Number(spt_data[2]),2021],spt_data[4])
            this.data = this.data.filter(hw => hw.id != homework.id)
            this.data.push(homework)
        }
        this.data = this.data.filter(hw => hw.day_left >= 0 && hw.isValid)
        this.sort()
    }

    sort(){
        // เดี๋ยวค่อยมาทำ Merge Sort ทีหลัง
        for(var i=0;i<this.data.length;i++){
            for(var j=0;j<this.data.length-1;j++){
                if(this.data[j] > this.data[j+1]){
                    var tmp = this.data[j]
                    this.data[j] = this.data[j+1]
                    this.data[j+1] = tmp
                }
            }
        }
    }

    list(){
        var format_string = `:bookmark: **Homework List (${this.data.length}):**\n`
        if(this.data.length == 0){return `${format_string}ไม่มีงาน!? เป็นไปได้ด้วยหรอครับเนี่ย!!??!`}

        for(var i=0;i<this.data.length;i++){
            var hw = this.data[i]
            var vis_day = " วัน"

            // Adding 0
            if(Number(hw.date[0])<10){hw.date[0] = `0${hw.date[0]}`}
            if(Number(hw.date[1])<10){hw.date[1] = `0${hw.date[1]}`}

            if(hw.day_left==0){
                hw.day_left = "เดี๋ยวนี้"
                vis_day = ""
            }
            if(hw.day_left<10){hw.day_left = "0" + hw.day_left}
            format_string += `[\`${hw.day_name}\`.\`${hw.date[0]}/${hw.date[1]}\`] ${hw.alert_icon} **(\`${hw.day_left}\`${vis_day})** 📝 \`[${hw.id}]\` \`${hw.label}\`\n`
        }
        return format_string
    }


}

var hl = new HomeworkList('homeworklist.txt')
console.log(hl.list())



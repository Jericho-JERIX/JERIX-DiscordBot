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
    constructor(file='homeworklist.txt'){
        this.file_name = file
        this.data = []
        this.least_id = 0
        this.throw_error = "Something went wrong! Please try again"

        var raw_data = fs.readFileSync(`${DataPath}resource\\${file}`,'utf8').split('\n')
        for(var i=0;i<raw_data.length;i++){
            var spt_data = raw_data[i].split(' ')

            // ID Saving
            if(Number(spt_data[0])>this.least_id){
                this.least_id = Number(spt_data[0])
            }

            var format_label = ""
            for(var j=4;j<spt_data.length;j++){
                format_label += `${spt_data[j]}`
                if(spt_data.length-1 != j){format_label += " "}
            }

            var homework = new Homework(spt_data[0],[Number(spt_data[1]),Number(spt_data[2]),2021],format_label)
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
        var format_string = `:bookmark: **Homework List 2.0 (${this.data.length}):**\n`
        if(this.data.length == 0){return `${format_string}ไม่มีงาน!? เป็นไปได้ด้วยหรอครับเนี่ย!!??!`}

        for(var i=0;i<this.data.length;i++){
            var hw = this.data[i]
            var vis_day = " วัน"

            // Adding 0
            var date  = Number(hw.date[0])<10 ? `0${hw.date[0]}` : `${hw.date[0]}`
            var month = Number(hw.date[1])<10 ? `0${hw.date[1]}` : `${hw.date[1]}`

            var day_left = ""
            if(hw.day_left==0){
                day_left = "เดี๋ยวนี้"
                vis_day = ""
            }else{
                day_left = hw.day_left<10 ? `0${hw.day_left}` : `${hw.day_left}`
            }
            format_string += `[\`${hw.day_name}\`.\`${date}/${month}\`] ${hw.alert_icon} **(\`${day_left}\`${vis_day})** 📝 \`[${hw.id}]\` \`${hw.label}\``
            if(i!=this.data.length-1){format_string += '\n'}
        }
        return format_string
    }

    refresh(){
        for(var i=0;i<this.data.length;i++){
            this.data = this.data.filter(hw => hw.id != this.data[i].id)
        }
        this.data = this.data.filter(hw => hw.day_left >= 0 && hw.isValid)
        this.sort()
    }

    add(arg,isNew=true,select_id ="0000"){
        // Check if day and month is Unknowed
        var isUnknowed = false //isNaN(Number(arg[0])) || isNaN(Number(arg[1])) ? true : false
        // if(isNaN(Number(arg[0])) || isNaN(Number(arg[1]))){return this.throw_error}

        // Generating Homeowork ID
        if(isNew){
            this.least_id += 1
            var id_number = String(this.least_id)
            while(id_number.length < 4){
                id_number = "0" + id_number
            }
        }
        else{
            var id_number = select_id
        }

        // 12 07 งาน ..... .....
        if(isUnknowed){
            arg[0] = "??"
            arg[1] = "??"
        }
        var timeStamper = isUnknowed ? 9999999999999 : new Date(2021,Number(arg[1]-1),Number(arg[0]),23,59,59).getTime()
        var formatFile = `\n${id_number} ${arg[0]} ${arg[1]} ${timeStamper}`

        // Adding 0
        if(!isUnknowed){
            if(Number(arg[0])<10){arg[0] = `0${arg[0]}`}
            if(Number(arg[1])<10){arg[1] = `0${arg[1]}`}
        }
        
        var format_label = ""
        for(var i=2;i<arg.length;i++){
            formatFile += ` ${arg[i]}`
            format_label += `${arg[i]} `
            // if(i==arg.length-1){format_label += '\n'}
        }
        fs.appendFileSync(`${DataPath}resource\\homeworklist.txt`,`${formatFile}`,(err)=>{})
        this.data.push(new Homework(id_number,[Number(arg[0]),Number(arg[1]),2021],format_label))
        this.sort()
        return this.list()
    }

    delete(hw_id){
        try{
            var del = this.data.filter(hw => hw.id == hw_id)[0]
            var format_data = `\n${del.id} 99 99`
            fs.appendFileSync(`${DataPath}resource\\homeworklist.txt`,`${format_data}`,(err)=>{})
            this.data = this.data.filter((hw)=> hw.id != hw_id)
            return this.list()
        }
        catch(err){
            return this.throw_error
        }
    }

    edit(hw_id,d,m){
        try{
            var editing = this.data.filter(ins => ins.id == hw_id)[0]
            this.data = this.data.filter(hw => hw.id != hw_id)
            var format_array = [d,m,editing.label]
            this.add(format_array,false,editing.id)
            return this.list()
        }
        catch(err){
            return this.throw_error
        }
    }
    
    remaining(){
        return this.data.length
    }

}

// var hl = new HomeworkList('homeworklist.txt')
// console.log(hl.list())
// console.log(hl.data[0])
// hl.add(['03','12','วิชาสหาฟดส > NEWWWW'])
// console.log(hl.add(['03','12','วิชาสหาฟดส > NEWWWWWWWWWW']))
// console.log(hl.delete("0127"))

// console.log(hl.edit("0128",7,12))
// console.log(hl.list())

var test = JSON.parse(fs.readFileSync(`${DataPath}resource\\homeworklist.json`,'utf8'))
// console.log()

module.exports = {
    HomeworkList
}
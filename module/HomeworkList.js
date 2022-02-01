const { prototype } = require("events")
const fs = require("fs")
const DataPath = "./module/"
const DayName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
const TypeIcon = {
    Assignment: "📝",
    Alert: "🔔",
    Exam: "🔥"
}

class Homework{
    constructor(id,date,label,type="Assignment"){
        this.isValid = true     // Boolean
        this.id = id            // String
        this.date = date        // Integer [Array]
        this.label = label      // String
        this.type = type
        this.type_icon = TypeIcon[type]
        
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
    constructor(file='homeworklist.json'){
        this.file_name = file
        this.data = []
        this.raw_data = []
        this.least_id = 0
        this.throw_error = "Something went wrong! Please try again"
        
        this.raw_data = JSON.parse(fs.readFileSync(`${DataPath}resource/${file}`,'utf8'))
        for(var i=0;i<this.raw_data.length;i++){
            var spt_data = this.raw_data[i]

            // ID Saving
            if(Number(spt_data.id)>this.least_id){
                this.least_id = Number(spt_data.id)
            }

            var format_label = spt_data.label

            var homework = new Homework(spt_data.id,[Number(spt_data.date),Number(spt_data.month),spt_data.year],format_label,spt_data.type)
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

    list(type="ALL"){
        var format_string = ``
        var type_count = 0
        var total_count = 0
        if(this.data.length == 0){return `:bookmark: **Homework List 2.0 (0):**\nไม่มีงาน!? เป็นไปได้ด้วยหรอครับเนี่ย!!??!`}

        for(var i=0;i<this.data.length;i++){
            var hw = this.data[i]
            
            var vis_day = " วัน"

            // Adding 0
            var date  = Number(hw.date[0])<10 ? `0${hw.date[0]}` : `${hw.date[0]}`
            var month = Number(hw.date[1])<10 ? `0${hw.date[1]}` : `${hw.date[1]}`

            // Re-Day Left
            hw.day_left = Math.floor((hw.timestamp-Date.now())/86400000)
            if(hw.day_left < 0) continue
            total_count += 1

            // Filtering By Type
            if(type!="ALL" && hw.type != type){
                
                continue;
            }
            
            hw.alert_icon = "⚫"
            if(hw.day_left <= 2){hw.alert_icon = "⭕"}
            else if(hw.day_left <= 5){hw.alert_icon = "🟡"}
            else if(hw.day_left <= 7){hw.alert_icon = "🔵"}
            
            var day_left = ""
            if(hw.day_left==0){
                day_left = "เดี๋ยวนี้"
                vis_day = ""
            }else{
                day_left = hw.day_left<10 ? `0${hw.day_left}` : `${hw.day_left}`
            }

            format_string += `[\`${hw.day_name}\`.\`${date}/${month}\`] ${hw.alert_icon} **(\`${day_left}\`${vis_day})** ${hw.type_icon} \`[${hw.id}]\` \`${hw.label}\``
            type_count += 1
            if(i!=this.data.length-1){format_string += '\n'}
        }
        if(type != "ALL"){
            format_string = `:bookmark: **Homework List 2.0 (${total_count}) >> ${TypeIcon[type]} ${type} (${type_count}):**\n${format_string}`
        }
        else{
            format_string = `:bookmark: **Homework List 2.0 (${total_count}):**\n${format_string}`
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

    add(arg,isNew=true,select_id ="0000",save=true,type="Assignment"){
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
        var timeStamper = isUnknowed ? 9999999999999 : new Date(2022,Number(arg[1]-1),Number(arg[0]),23,59,59).getTime()
        var formatFile = `\n${id_number} ${arg[0]} ${arg[1]} ${timeStamper}`

        // Adding 0
        if(!isUnknowed){
            if(Number(arg[0])<10){arg[0] = `0${arg[0]}`}
            if(Number(arg[1])<10){arg[1] = `0${arg[1]}`}
        }
        
        var format_label = ""
        for(var i=2;i<arg.length;i++){
            formatFile += ` ${arg[i]}`
            format_label += `${arg[i]}`
            if(i!=arg.length-1){format_label += ' '}
        }
        // fs.appendFileSync(`${DataPath}resource\\${this.file_name}`,`${formatFile}`,(err)=>{})
        var new_homework = new Homework(id_number,[Number(arg[0]),Number(arg[1]),2022],format_label,type)
        this.data.push(new_homework)
        if(save){
            this.raw_data.push({
                id: new_homework.id,
                date: new_homework.date[0],
                month: new_homework.date[1],
                year: 2022,
                type: new_homework.type,
                label: new_homework.label
            })
            fs.writeFileSync(`${DataPath}resource/${this.file_name}`,JSON.stringify(this.raw_data,null,'\t'),(err)=>{})    
        }
        this.sort()
        return this.list()
    }

    delete(hw_id){
        try{
            this.raw_data = this.raw_data.filter(hw => hw.id != hw_id)
            fs.writeFileSync(`${DataPath}resource/${this.file_name}`,JSON.stringify(this.raw_data,null,'\t'),(err)=>{})
            this.data = this.data.filter((hw)=> hw.id != hw_id)
            return this.list()
        }
        catch(err){
            return this.throw_error
        }
    }

    edit(hw_id,d,m){
        try{
            for(var i=0;i<this.raw_data.length;i++){
                if(this.raw_data[i].id == hw_id){
                    this.raw_data[i].date = Number(d)
                    this.raw_data[i].month = Number(m)
                    break
                }
            }
            fs.writeFileSync(`${DataPath}resource/${this.file_name}`,JSON.stringify(this.raw_data,null,'\t'),(err)=>{})
            var editing = this.data.filter(ins => ins.id == hw_id)[0]
            this.data = this.data.filter(hw => hw.id != hw_id)
            var format_array = [d,m,editing.label]
            this.add(format_array,false,editing.id,false,editing.type)
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

// var hl = new HomeworkList('homeworklist.json')
// console.log()
// console.log(hl.list())
// console.log(hl.data[0])
// hl.add(['03','12','วิชาสหาฟดส > NEWWWW'])
// console.log(hl.add(['03','12','วิชาสหาฟดส > NEWWWWWWWWWW']))
// console.log(hl.delete("0130"))

// console.log(hl.edit("0131",5,12))
// console.log(hl.list())

// var test = JSON.parse(fs.readFileSync(`${DataPath}resource\\homeworklist.json`,'utf8'))
// console.log()

module.exports = {
    HomeworkList
}

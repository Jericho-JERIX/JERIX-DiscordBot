const fs = require("fs")
const DataPath = "C:\\Users\\User\\Documents\\Abstract Dimension\\JERIX2\\module\\"

var HomeworkList = {
    data: [],
    /* Data Type
    {
        id: instance_data[0],
        date: [ins_d,ins_m,ins_y],
        timestamp: hw_timestamp,
        day: day_name,
        label: format_label,
        day_left: time_left,
        icon: alert_icon
    } */
    currentTimestamp: Date.now(),
    least_id: 0,
    throw_error: "Something went wrong! Please try again",

    readFile: function(){
        this.data = []
        this.currentTimestamp = Date.now()
        var raw_data = fs.readFileSync(`${DataPath}resource\\homeworklist.txt`,'utf8').split('\n')
        for(var i=0;i<raw_data.length;i++){
            var instance_data = raw_data[i].split(' ')

            // Id Save
            if(Number(instance_data[0])>this.least_id){this.least_id = Number(instance_data[0])}
            
            // Filtering Duplicate Homework or Deleted
            this.data = this.data.filter(ins => ins.id != instance_data[0])
            if(Number(instance_data[1] == 99)){continue}

            // Pass if due date is passed 
            if(Number(instance_data[3])<this.currentTimestamp){continue}

            // Turn to Unknowed Due Date
            var isUnknowed = isNaN(Number(instance_data[1])) || isNaN(Number(instance_data[2])) ? true : false

            var ins_d = isUnknowed ? "??" : Number(instance_data[1])
            var ins_m = isUnknowed ? "??" : Number(instance_data[2])
            var ins_y = isUnknowed ? "??" : 2021
            var hw_timestamp = isUnknowed ? 9999999999999 : new Date(2021,ins_m-1,ins_d,23,59,59).getTime()

            var date_no = isUnknowed ? 7 : new Date(2021,ins_m-1,ins_d).getDay()
            var day_name = ""
            if(date_no==0){day_name="Sun"}
            else if(date_no==1){day_name="Mon"}
            else if(date_no==2){day_name="Tue"}
            else if(date_no==3){day_name="Wed"}
            else if(date_no==4){day_name="Thu"}
            else if(date_no==5){day_name="Fri"}
            else if(date_no==6){day_name="Sat"}
            else{day_name="???"}

            var format_label = ""
            for(var j=4;j<instance_data.length;j++){
                format_label += instance_data[j]
                if(j!=instance_data.length-1){
                    format_label += " "
                }
            }

            var time_left = isUnknowed ? "??" : Math.floor((hw_timestamp-this.currentTimestamp)/86400000)
            var alert_icon = "⚫"
            if(time_left <= 2){alert_icon = "⭕"}
            else if(time_left <= 5){alert_icon = "🟡"}
            else if(time_left <= 7){alert_icon = "🔵"}

            this.data.push({
                id: instance_data[0],
                date: [ins_d,ins_m,ins_y],
                timestamp: hw_timestamp,
                day: day_name,
                label: format_label,
                day_left: time_left,
                icon: alert_icon
            })
        }

        // EZ Bubble Sort
        for(var i=0;i<this.data.length;i++){
            for(var j=0;j<this.data.length-1;j++){
                if(this.data[j].timestamp > this.data[j+1].timestamp){
                    var tmp = this.data[j]
                    this.data[j] = this.data[j+1]
                    this.data[j+1] = tmp
                }
            }
        }
    },

    listHomework: function(){
        this.readFile()
        var format_string = `:bookmark: **Homework List (${this.data.length}):**\n`

        // Check if no homework
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
            format_string += `[\`${hw.day}\`.\`${hw.date[0]}/${hw.date[1]}\`] ${hw.icon} **(\`${hw.day_left}\`${vis_day})** 📝 \`[${hw.id}]\` \`${hw.label}\`\n`
        }
        // Take This Out After 9 Oct
        // format_string += `\n💥 อะไรนะ งานข้างบนนี่ดู*น้อย*ไปหรอ?\n📄 สนใจทำ__แบบสอบถามซื้อขายสินค้าออนไลน์__กันสักหน่อยมั้ย\n🕒 ใช้เวลาทำแค่ **10** นาทีเท่านั้นเอง\n**กดที่ลิงก์นี้เลย>>**||https://forms.gle/2fTxbg18GiNDF1q19||`
        return format_string
    },

    addHomework: function(arg,isNew=true,select_id="0000"){
        // Check if day and month is Unknowed
        var isUnknowed = isNaN(Number(arg[0])) || isNaN(Number(arg[1])) ? true : false
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
        
        for(var i=2;i<arg.length;i++)[
            formatFile += ` ${arg[i]}`
        ]
        fs.appendFileSync(`${DataPath}resource\\homeworklist.txt`,`${formatFile}`,(err)=>{})
        return this.listHomework()
    },

    deleteHomework: function(hw_id){
        try{
            var del = this.data.filter(ins => ins.id == hw_id)[0]
            var format_data = `\n${del.id} 99 99`
            fs.appendFileSync(`${DataPath}resource\\homeworklist.txt`,`${format_data}`,(err)=>{})
            return this.listHomework()
        }
        catch(err){
            return this.throw_error
        }
    },

    editHomework: function(hw_id,d,m){
        try{
            var editing = this.data.filter(ins => ins.id == hw_id)[0]
            var format_array = [d,m,editing.label]
            this.addHomework(format_array,false,editing.id)
            return this.listHomework()
        }
        catch(err){
            return this.throw_error
        }
    },

    remaining: function(){
        return this.data.length
    }
}

module.exports = {
    HomeworkList
}
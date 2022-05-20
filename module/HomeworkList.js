const { default: axios } = require("axios")
const HOMEWORK_API = "http://localhost:8000/homeworklist"
const Header = ":bookmark: **Homeworklist 3.0**"
const TypeIcon = {
    ASSIGNMENT: "📝",
    ALERT: "🔔",
    EXAM: "🔥"
}

function getYear(d,m){
    const currentYear = Number(String(new Date()).split(' ')[3])
    const duets = new Date(currentYear,m-1,d,23,59,59).getTime()
    const nowts = Date.now()
    if(duets <= nowts){
        return currentYear+1
    }
    return currentYear
}

class Homework{
    constructor(homework){
        this.id = homework.id
        this.isActive = homework.isActive
        this.date = homework.date
        this.month = homework.month
        this.year = homework.year
        this.timestamp = homework.timestamp*1000
        this.day_name = homework.day_name.slice(0,3)
        this.type = homework.type
        this.label = homework.label
        
        this.day_left = Math.floor((this.timestamp-Date.now())/86400000)

        this.type_icon = TypeIcon[homework.type]
        this.alert_icon = "⚫"
        if(this.day_left <= 2){this.alert_icon = "⭕"}
        else if(this.day_left <= 5){this.alert_icon = "🟡"}
        else if(this.day_left <= 7){this.alert_icon = "🔵"}
    }
}
Homework.prototype.valueOf = function(){return this.timestamp}

class HomeworkList{
    constructor(){
        this.filename = ""
        this.data = []
        this.raw_data = {}
        this.throw_error = "Something went wrong! Please try again"
    }

    async init(filename="cpe-homework"){
        this.filename = ""
        this.data = []
        this.raw_data = {}
        this.throw_error = "Something went wrong! Please try again"
        const response = await axios.get(`${HOMEWORK_API}/file/${filename}`)
        this.raw_data = response.data
        this.filename = filename

        for(var i in this.raw_data){
            this.data.push(new Homework(this.raw_data[i]))
        }
        this.sort()
        return this.list()
    }

    async channelInit(channelId){
        const response = await axios.get(`${HOMEWORK_API}/channel/${channelId}`)
        if(response.data.status < 400){
            await this.init(response.data.data)
        }
        return response.data.status
    }

    async authInit(fname,passwd){
        // const body = {
        //     filename: "cpe-homework",
        //     password: "123456"
        // }
        // console.log(body,HOMEWORK_API)
        const response = await axios.get(`http://localhost:8000/homeworklist?filename=${fname}&password=${passwd}`)
        if(response.data.status < 400){
            return this.init(fname)
        }
        return `${Header}\n${response.data.message}`
        // console.log(response.data)
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
        if(this.data.length == 0){return `${Header}\n\`\`\`\n📁 File: ${this.filename} (0)\`\`\`*-----ไม่มีงาน เป็นไปได้ด้วยหรอครับเนี่ย-----*`}

        for(var i in this.data){
            var hw = this.data[i]
            
            var vis_day = " วัน"

            // Adding 0
            var date  = Number(hw.date)<10 ? `0${hw.date}` : `${hw.date}`
            var month = Number(hw.month)<10 ? `0${hw.month}` : `${hw.month}`

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
            format_string = `${Header}\n\`\`\`\n📁 File: ${this.filename} (${total_count}) >> ${TypeIcon[type]} ${type} (${type_count}):\`\`\`${format_string}`
        }
        else{
            format_string = `${Header}\n\`\`\`\n📁 File: ${this.filename} (${total_count})\`\`\`${format_string}`
        }
        return format_string
    }

    async createNewFile(newfile,passwd){
        const body = {
            filename : newfile,
            password : passwd
        }
        const response = await axios.post(`${HOMEWORK_API}`,body)
        if(response.data.status < 400){
            return `${Header}\n${response.data.message} \`📁${response.data.data.filename}\``
        }
        return response.data.message
    }

    async add(d,m,hw_label,item_type){

        d = Number(d)
        m = Number(m)

        const body = {
            date    : d,
            month   : m,
            year    : getYear(d,m),
            type    : item_type.toUpperCase(),
            label   : hw_label,
        }

        await axios.post(`${HOMEWORK_API}/file/${this.filename}`,body)
        return this.init(this.filename)
    }

    async delete(id){
        await axios.delete(`${HOMEWORK_API}/file/${this.filename}/${id}`)
        return this.init(this.filename)
    }

    async editDate(id,d,m){
        d = Number(d)
        m = Number(m)

        const body = {
            id      : id,
            date    : d,
            month   : m,
            year    : getYear(d,m)
        }
        await axios.patch(`${HOMEWORK_API}/file/${this.filename}/edit/date`,body)
        return this.init(this.filename)
    }

    async editLabel(id,new_label){
        const body = {
            id      : id,
            label   : new_label
        }
        await axios.patch(`${HOMEWORK_API}/file/${this.filename}/edit/label`,body)
        return this.init(this.filename)
    }

    async editType(id,new_type){
        const body = {
            id      : id,
            type    : new_type.toUpperCase()
        }
        await axios.patch(`${HOMEWORK_API}/file/${this.filename}/edit/type`,body)
        return this.init(this.filename)
    }
    
    remaining(){
        return this.data.length
    }

}

// var hl = new HomeworkList('homeworklist.json')
async function main(){
    // var hl = new HomeworkList()
    // await hl.channelInit('862013848943722507')
// 
    // console.log(hl.list())

    // var sample = [16,5,"Test","Homework","888"]
    // await hl.init('cpe-homework')
    // var result = await hl.authInit('cpe-homework','asd')
    // console.log(result)
    // console.log(hl.list())
    // var result = await hl.editDate('0157',20,3)
    // console.log(result)
    // var result = await hl.add(sample,"ASSIGNMENT")
    // console.log(result)
    // var result = await hl.delete('0165')
    // console.log(result)
    // var result = await hl.editType('0158',"alert")
    // console.log(result)
}main()

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
    HomeworkList,
    Header,
    HOMEWORK_API
}

const fs = require('fs')
const Today = require('./Today')
const DataPath = "./module/"
const ShortDateName = ['sun','mon','tue','wed','thu','fri','sat']

function dayTime(time){
    var t = time.split(':')
    return Number(t[0])*60 + Number(t[1])
}

class Subject{
    constructor(id,subject,start,end){
        this.id = id
        this.subject = subject
        this.time_start = start
        this.end = end
    }
}

class Schedule{
    constructor(filename){
        this.json_data = JSON.parse(fs.readFileSync(`${DataPath}resource/${filename}`,'utf-8'))
        this.linear_data = []
        this.upper_bound_schedule = 540
        this.lower_bound_schedule = 1200
        this.current_index = 0

        for(var i in this.json_data){
            for(var j in this.json_data[i]){
                var current_subject = this.json_data[i][j]
                current_subject['day'] = i
                this.linear_data.push(current_subject)
            }
        }
    }

    current(){
        var now = {hour: 8,minute: 10} // new Today.AtThisTime()
        var sday_name = 'tue' // now.date_name.slice(0,3).toLowerCase()

        for(var i=0;i<this.linear_data.length;i++){

            if(ShortDateName.indexOf(sday_name) < this.linear_data[i].day){
                this.current_index = (i+1) % this.linear_data.length
                break
            }

            var subject = this.linear_data[i]
            var start = dayTime(subject.time_start)
            var end = dayTime(subject.time_end)
            var currenly = now.hour*60 + now.minute

            if(subject.day == sday_name && currenly >= start && currenly <= end){
                this.current_index = i
                console.log(subject)
                console.log(this.current_index)
                return
            }
            else if(subject.day == sday_name && dayTime(this.linear_data[(i+1)%this.linear_data.length].time_start) > currenly){
                console.log(this.linear_data[(i+1)%this.linear_data.length])
                return
            }

        }
        console.log("NO CURRENTLY CLASS RIGHT NOW!")
    }
}

var sche = new Schedule('cpetimetable.json')
sche.current()
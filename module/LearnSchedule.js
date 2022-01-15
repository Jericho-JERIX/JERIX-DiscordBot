const fs = require('fs')
const Today = require('./Today')
const DataPath = "./module/"

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

        for(var i in this.json_data){
            for(var j in this.json_data[i]){
                var current_subject = this.json_data[i][j]
                current_subject['day'] = i
                this.linear_data.push(current_subject)
            }
        }
    }

    current(){
        // var now = new Today.AtThisTime()
        var now = {
            hour: 11,
            minute: 21
        }
        var sday_name = 'fri'// today.dat_name.slice(0,3).toLowerCase()

        for(var i=0;i<this.json_data[sday_name].length;i++){
            var subject = this.json_data[sday_name][i]
            var start = subject.time_start.split(':') ; for(var j in start){start[j] = Number(start[j])};   start = start[0]*60 + start[1]
            var end = subject.time_end.split(':') ;     for(var j in end){end[j] = Number(end[j])};         end = end[0]*60 + end[1]
            var currenly = now.hour*60 + now.minute

            if(currenly >= start && currenly <= end){
                console.log(subject)
                return
            }

        }
        console.log("NO CURRENTLY CLASS RIGHT NOW!")
    }
}

var sche = new Schedule('cpetimetable.json')
// console.log(sche.linear_data)
// console.log(sche.json_data)
sche.current()
// var sche = new Schedule('homeworklist.json')
const Day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const Month = ["","January","February","March","April","May","June","July","August","September","October","November","December"]

class AtThisTime{
    constructor(){
        var today = new Date()

        this.date = today.getDate()
        this.month = today.getMonth()+1
        this.month_name = Month[this.month]
        this.year = today.getFullYear()
        this.day = today.getDay()
        this.date_name = Day[this.day]

        this.timestamp = Date.now()
        this.second = today.getSeconds()
        this.minute = today.getMinutes()
        this.hour = today.getHours()
    }
}

module.exports = {
    AtThisTime
}
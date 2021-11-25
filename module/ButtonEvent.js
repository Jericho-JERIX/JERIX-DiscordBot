class Counter{
    constructor(){
        this.count = 0
    }
    increment(){
        this.count++
    }
    decrement(){
        this.count--
    }
    reset(){
        this.count = 0
    }
}

module.exports = {
    Counter
}
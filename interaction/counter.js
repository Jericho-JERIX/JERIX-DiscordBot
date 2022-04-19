module.exports = {
    name: "counter",
    alias: ['counter'],
    roleRequirement: [],
    execute: function(interact,arg,Counter){
        if(arg[1]=='inc') Counter.increment()
        else if(arg[1]=='dec') Counter.decrement()
        else Counter.reset()
        interact.message.edit(String(Counter.count))
    }
}
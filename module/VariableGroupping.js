var VariableGroup = {
    data: [],
    g_var: {x:0,y:0,z:0},
    get: function(text){
        this.data = []
        this.g_var = {x:0,y:0,z:0}

        var i = 0
        var sub_string = ""

        while(i<text.length){
            do{
                if(text[i]=="="){
                    this.data.push(sub_string)
                    sub_string = ""
                    this.data.push(text[i])
                    i++
                }
                sub_string += text[i]
                i++
            }while(!["+","-"].includes(text[i]) && i <= text.length-1)
            if(sub_string[0] != "+" && sub_string[0] != "-"){
                sub_string = "+"+sub_string
            }
            this.data.push(sub_string)
            sub_string = ""
        }

        var opr = ["+","-"]
        for(var i=0;i<this.data.length;i++){
            
            if(this.data[i]=="="){
                opr = ["-","+"]
                continue
            }

            var value = this.data[i].slice(1,this.data[i].length-1)
            if(value==""){value = "1"}

            if(this.data[i][0] == opr[0]){
                this.g_var[this.data[i][this.data[i].length-1]] += Number(value)
            }
            else{
                this.g_var[this.data[i][this.data[i].length-1]] -= Number(value)
            }
            
        }
    },
    show: function(){
        var format_string = ""
        for(var i in this.g_var){
            if(this.g_var[i] != 0){
                if(i!="x" && this.g_var[i]>0){
                    format_string += "+"
                }
                format_string += `${this.g_var[i]}${i}`
            }
        }
        format_string += " = 0"
        return format_string
    }
}

// VariableGroup.get("3x+2y-z=z+2y+3y")
// console.log(VariableGroup.data)
// console.log(VariableGroup.show())

module.exports = {VariableGroup}
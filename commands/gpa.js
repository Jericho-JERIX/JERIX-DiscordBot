module.exports = {
    name: "gpa",
    alias: ['gpa'],
    roleRequirement: [],
    execute: function(message,arg){
        message.channel.bulkDelete(1)
        var tCredit = 0
        var tGrade = 0
    
        var isnotGrade = false
        var tNCredit = 0
        var bestGrade = 0
        var worstGrade = 0
    
        var grader = {
            char:['A','B+','B','C+','C','D+','D','F'],
            grade:[4,3.5,3,2.5,2,1.5,1,0]
        }
    
        for(i=1;i<arg.length;i+=2){ // 3 A 4 B
            tCredit += Number(arg[i])
            tNCredit += Number(arg[i])
            if(arg[i+1] == "N"){
                isnotGrade = true
                tCredit -= Number(arg[i])
                bestGrade += Number(arg[i])*4
                worstGrade += Number(arg[i])*0
            }
            else{
                for(j=0;j<grader.char.length;j++){
                    if(arg[i+1] == grader.char[j] || arg[i+1] == grader.grade[j]){
                        tGrade += grader.grade[j]*Number(arg[i])
                        bestGrade += grader.grade[j]*Number(arg[i])
                        worstGrade += grader.grade[j]*Number(arg[i])
                    }
                }
            }
        }
    
        var gpa = tGrade/tCredit
        var bestGpa = bestGrade/tNCredit
        var worstGpa = worstGrade/tNCredit
    
        // message.author.send(`📁 \`Best GPA:\` **${Number(bestGpa).toFixe(2)}**\n📊 \`Worst GPA:\` **${Number(worstGpa).toFixed(2)}**`)
    
        if(tCredit/tCredit != 1 || gpa/gpa != 1){
            message.channel.send(`**[SYNTAX]** j!gpa \`<sub#1 Credit>\` \`<sub#1 Grade>\` \`<sub#2 Credit>\` \`<sub#2 Grade>\` ...\n__**Example**__:  j!gpa 3 B+ 2 A`)
        }
        else{
            message.channel.send("*Your grade has been sent.*")
            message.author.send("==================")
            message.author.send(`> 📁 \`Total Credit:\` **${tNCredit.toFixed(1)}**\n> 📊 \`Current GPA:\` ||**${Number(gpa).toFixed(2)}**||`)
            if(isnotGrade){
                message.author.send(`> 📈 \`Comeback GPA:\` ||**${Number(bestGpa).toFixed(2)}**||\n> 📉 \`Choked GPA:\` ||**${Number(worstGpa).toFixed(2)}**||`)
            }
            message.author.send("==================")
        }
        return 0
    }
}
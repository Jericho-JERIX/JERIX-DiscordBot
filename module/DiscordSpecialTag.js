function getSpecial(text){
    var result = {
        emoji: [],
        mentions_user: [],
        mentions_channel: [],
        mentions_role: []
    }
    var i = 0
    while(i<text.length){
        if(text[i] == '<'){
            var content = "<"
            i++
            while(i < text.length){
                content += text[i]
                if(text[i] == '>') break
                i++
            }
            if(content[content.length-1] == '>'){
                if(content[1] == ':'){
                    result.emoji.push(content)
                }
                else if(content[1] == '@' && content[2] == '&'){
                    result.mentions_role.push(content)
                }
                else if(content[1] == '@'){
                    result.mentions_user.push(content)
                }
                else if(content[1] == '#'){
                    result.mentions_channel.push(content)
                }
            }
        }
        i++
    }
    return result
}

module.exports = {
    getSpecial
}
function findThaiWord(message,word){
    var current = 0
    for(var i=0;i<message.length;i++){
        if(message[i] == ' ') continue
        if(message[i]==word[current]){
            current++
        }
        else{
            current = 0
        }
        if(current == word.length){
            return true
        }
    }
    return false
}

module.exports = {
    findThaiWord
}

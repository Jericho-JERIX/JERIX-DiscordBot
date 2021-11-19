var Hangman = {
    credit: 7,
    randomWord: "ant",
    word: ['A','N','T'],
    answerBox: ["_","_","_"],
    guessBox: [],
    icon: ['________\n\
  |  |\n\
  O  |\n\
 /|/ |\n\
  |  |\n\
 /|  |',
'________\n\
 |  |\n\
 O  |\n\
/|/ |\n\
 |  |\n\
 |  |',
'________\n\
 |  |\n\
 O  |\n\
/|/ |\n\
 |  |\n\
    |',
'________\n\
  |  |\n\
  O  |\n\
 /|/ |\n\
     |\n\
     |',
 '________\n\
  |  |\n\
  O  |\n\
 /|  |\n\
     |\n\
     |',
 '________\n\
  |  |\n\
  O  |\n\
  |  |\n\
     |\n\
     |',
 '________\n\
  |  |\n\
  O  |\n\
     |\n\
     |\n\
     |',
 '________\n\
  |  |\n\
     |\n\
     |\n\
     |\n\
     |'
    ],

    createGame: function(){
        this.credit = 7,
        this.word = ['A','N','T'],
        this.answerBox = []
        for(var i=0;i<this.word.length;i++){
            this.answerBox.push("_")
        }
        this.guessBox = []
    },

    show: function(isOver = false){
        var layout = "answerBox"
        if(isOver){layout = "word"}
        var formatString = `${this.icon[this.credit]}\n\n`
        for(var i=0;i<this[layout].length;i++){
            formatString += `${this[layout][i]} `
        }
        formatString += '\n\nAlphabet Guessed: '
        for(var i=0;i<this.guessBox.length;i++){
            formatString += `${this.guessBox[i]} `
        }
        formatString += `\nCredit Left: ${this.credit}`

        return formatString
    },

    addChar: function(char){
        var isFound = false
        for(var i=0;i<this.word.length;i++){
            if(this.word[i] == char){
                this.answerBox[i] = char
                isFound = true
            }
        }
        if(!isFound && !this.guessBox.includes(char)){
            this.guessBox.push(char)
            this.credit--
        }
    },

    checkWin: function(){
        if(!this.answerBox.includes("_")){
            return 2
        }
        else if(this.credit == 0){
            return 1
        }
        return 0
    }

}

module.exports = {
    Hangman
}
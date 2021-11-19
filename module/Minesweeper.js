var Minesweeper = {

    alphabet: [
        "","a","b","c","d","e","f","g","h",
        "i","j","k","l","m","n","o","p","q",
        "r","s","t","u","v","w","x","y","z",
    ],

    displayBoard: [
        ["?","?","?","?","?","?","?","?","?","?"],
        ["?","?","?","?","?","?","?","?","?","?"],
        ["?","?","?","?","?","?","?","?","?","?"],
        ["?","?","?","?","?","?","?","?","?","?"],
        ["?","?","?","?","?","?","?","?","?","?"],
        ["?","?","?","?","?","?","?","?","?","?"],
        ["?","?","?","?","?","?","?","?","?","?"],
        ["?","?","?","?","?","?","?","?","?","?"],
        ["?","?","?","?","?","?","?","?","?","?"],
        ["?","?","?","?","?","?","?","?","?","?"],
    ],

    board: [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ],

    width: 10,
    height: 10,
    areaBoard: 100,
    nBomb: 16,
    bombPositionH: [],
    bombPositionW: [],

    createBoard: function(w,h){
        // Building Plain Board

        this.bombPositionH = []
        this.bombPositionW = []

        var customBoard = []
        var customAnsBoard = []
        for(var i=0;i<h;i++){
            var subCustomBoard = []
            var subCustomAnsBoard = []
            for(var j=0;j<w;j++){
                subCustomBoard.push("?")
                subCustomAnsBoard.push(0);
            }
            customBoard.push(subCustomBoard)
            customAnsBoard.push(subCustomAnsBoard)
        }
        this.displayBoard = customBoard
        this.board = customAnsBoard

        this.width = w
        this.height = h

        // Random Mine
        this.areaBoard = this.board.length * this.board[0].length
        this.nBomb = Math.floor(this.areaBoard / 6)

        for(var i=0;i<this.nBomb;i++){
            var posW = Math.floor(Math.random()*this.width)
            var posH = Math.floor(Math.random()*this.height)
            
            var isSame = false
            var firstTime = true
            while(isSame || firstTime){
                isSame = false
                firstTime = false
                for(var i=0;i<this.bombPositionW.length;i++){
                    if(this.bombPositionW[i] == posW && this.bombPositionH[i] == posH){
                        posW = Math.floor(Math.random()*this.width)
                        posH = Math.floor(Math.random()*this.height)
                        isSame = true
                        break
                    }
                }
            }
            this.bombPositionW.push(posW)
            this.bombPositionH.push(posH)
        }

        // Plotting Mine
        for(var n=0;n<this.nBomb;n++){
            for(var i=0;i<3;i++){
                for(var j=0;j<3;j++){
                    var iPos = this.bombPositionH[n]-1+i
                    var jPos = this.bombPositionW[n]-1+j
                    if(iPos >= 0 && jPos >= 0 && iPos < this.height && jPos < this.width){
                        this.board[iPos][jPos]++;
                    }
                }
            }
        }

        for(var n=0;n<this.nBomb;n++){
            this.board[this.bombPositionH[n]][this.bombPositionW[n]] = "X"
        }
        // console.log("Done")

    },

    showBoard: function(solution=false){
        var showing = "displayBoard"
        if(solution){showing = "board"}

        var formatString = "00 "
        for(var a=0;a<this[showing][0].length;a++){
            formatString += `${this.alphabet[a+1].toUpperCase()} `
        }
        formatString += '\n'

        for(var i=0;i<this[showing].length;i++){
            if(i < 9){
                formatString += "0"
            }
            formatString += `${i+1} `
            for(var j=0;j<this[showing][0].length;j++){
                formatString += `${this[showing][i][j]} `
            }
            formatString += "\n"
        }
        var info = this.checkWin(true)
        formatString += `\nRemaining: ${this.areaBoard-this.nBomb-info[0]}/${this.areaBoard-this.nBomb}\nBomb Count: ${info[1]}/${this.nBomb}`
        return formatString
    },

    reveal: function(a,b,isFlag){
        try{
            var iPos = b-1
            var jPos = this.alphabet.indexOf(a)-1

            if(isFlag){
                this.displayBoard[iPos][jPos] = "F"
            }
            else{
                this.displayBoard[iPos][jPos] = this.board[iPos][jPos]
                if(this.board[iPos][jPos]=="X"){
                    this.board[iPos][jPos] = "!"
                    return false
                }
            }
            

        }
        catch(err){}
        this.revealZero()
        return true

    },

    revealZero: function(){
        var previousBoard = []
        for(var i=0;i<this.displayBoard.length;i++){
            var subArr = []
            for(var j=0;j<this.displayBoard[0].length;j++){
                subArr.push(this.displayBoard[i][j])
            }
            previousBoard.push(subArr)
        }

        for(var i=0;i<this.displayBoard.length;i++){
            for(var j=0;j<this.displayBoard[0].length;j++){
                if(this.displayBoard[i][j] == 0){
                    for(var a=0;a<3;a++){
                        for(var b=0;b<3;b++){
                            iPos = i+a-1
                            jPos = j+b-1
                            if(iPos >= 0 && jPos >= 0 && iPos < this.height && jPos < this.width){
                                this.displayBoard[iPos][jPos] = this.board[iPos][jPos]
                            }
                        }
                    }
                }
            }
        }

        for(var i=0;i<previousBoard.length;i++){
            for(var j=0;j<previousBoard[0].length;j++){
                if(previousBoard[i][j] != this.displayBoard[i][j]){
                    return this.revealZero()
                }
            }
        }
    },

    checkWin: function(show=false){
        var remainingBoard = this.areaBoard
        var flagCount = 0
        for(var i=0;i<this.displayBoard.length;i++){
            for(var j=0;j<this.displayBoard[0].length;j++){
                if(this.displayBoard[i][j] != "?" && this.displayBoard[i][j] != "F"){
                    remainingBoard--
                }
                if(this.displayBoard[i][j] == "F"){
                    flagCount++
                }
            }
        }
        if(!show){
            if(remainingBoard <= this.nBomb){
                return true
            }
            return false
        }
        else{
            return [remainingBoard-this.nBomb,flagCount]
        }
    }

}

module.exports = {
    Minesweeper
}
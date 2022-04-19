const TokenIcon = ['X','O']


class Player{
    constructor(uid,name){
        this.name = name
        this.uid = uid
        this.token = [1,1,1,1,1]
    }
}

class NextLevelXO{
    constructor(uid1,name1,uid2,name2){
        this.player = [new Player(uid1,name1),new Player(uid2,name2)]
        this.board = {
            row: 3,
            col: 3,
            owner: [
                ['-','-','-'],
                ['-','-','-'],
                ['-','-','-']
            ],
            level: [
                ['-','-','-'],
                ['-','-','-'],
                ['-','-','-']
            ]
        }
        this.turn = 0
    }

    showBoard(){
        var format_string = ""
        for(var i=0;i<this.board.row;i++){
            for(var j=0;j<this.board.col;j++){
                var increase_level = this.board.level[i][j]
                if(increase_level != '-')
                    increase_level++
                format_string += `| [${this.board.owner[i][j]},${increase_level}] `
            }
            format_string += "|\n"
        }
        format_string += `\nPlayer #1: ${this.player[0].name}\n`
        format_string += "Token Available: 1 > "
        for(var i=0;i<5;i++){
            if(this.player[0].token[i])
                format_string += "✅ "
            else
                format_string += "❌ "
        }
        format_string += "< 5"
        format_string += '\n\n'
        format_string += `Player #2: ${this.player[1].name}\n`
        format_string += "Token Available: 1 > "
        for(var i=0;i<5;i++){
            if(this.player[1].token[i])
                format_string += "✅ "
            else
                format_string += "❌ "
        }
        format_string += "< 5"
        return format_string
    }

    placeBlock(a,b,level){
        if(!this.player[this.turn].token[level]) return -1
        if(this.board.owner[a][b] == '-' || this.board.level[a][b] < level){
            this.board.owner[a][b] = TokenIcon[this.turn]
            this.board.level[a][b] = level
            this.player[this.turn].token[level] = 0
            if(this.isWin()){
                return this.turn + 1
            }
            this.turn = Number(!this.turn)
        }
        return 0
        // this.showBoard()
    }

    isWin(){
        for(var i=0;i<3;i++){
            if(this.board.owner[i][0] != '-' && this.board.owner[i][0] == this.board.owner[i][1] && this.board.owner[i][1] == this.board.owner[i][2]) return 1
            if(this.board.owner[0][i] != '-' && this.board.owner[0][i] == this.board.owner[1][i] && this.board.owner[1][i] == this.board.owner[2][i]) return 1
        }
        if(this.board.owner[0][0] != '-' && this.board.owner[0][0] == this.board.owner[1][1] && this.board.owner[1][1] == this.board.owner[2][2]) return 1
        if(this.board.owner[2][0] != '-' && this.board.owner[2][0] == this.board.owner[1][1] && this.board.owner[1][1] == this.board.owner[0][2]) return 1
        return 0
    }
}

module.exports = {
    NextLevelXO
}

// game = new NextLevelXO('1','AAA','2','BBBB')
// game.placeBlock(1,2,3)
// game.placeBlock(1,1,4)
// game.placeBlock(0,0,2)
// game.placeBlock(0,1,1)
// game.placeBlock(2,2,0)
// game.placeBlock(2,1,0)
// game.showBoard()
// console.log(game.isWin())
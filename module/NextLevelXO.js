const axios = require('axios')
const TokenIcon = ['❌','⭕']
const IP_ADDRESS = "http://localhost:8000/nextlevelxo"

async function getMatch(uid){
    const response = await axios.get(`${IP_ADDRESS}/uid?uid=${uid}`)
    return response.data
}

async function getNXOData(){
    const response = await axios.get(IP_ADDRESS)
    return response.data
}

async function createMatch(uid1,player1,uid2,player2){
    const response = await axios.post(IP_ADDRESS,{
        uid1: uid1,
        username1: player1,
        uid2: uid2,
        username2: player2
    })
    return response.data
}

class Player{
    constructor(uid,name,token){
        this.name = name
        this.uid = uid
        this.token = token
    }
}

class NextLevelXO{
    constructor(match){
        this.match_id = match.match_id
        this.isValid = match.isValid
        this.player = match.player/* [
            new Player(match.player[0].uid,match.player[0].username,match.player[0].token),
            new Player(match.player[1].uid,match.player[1].username,match.player[1].token)
        ] */
        this.board = match.board /* {
            owner: match.board.owner,
            level: match.board.level
        } */
        this.turn = match.turn /* match.turn */
    }

    showBoard(){
        var format_string = "```\n"
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                var increase_level = this.board.level[i][j]
                if(increase_level != '-')
                    increase_level++
                format_string += `| [${this.board.owner[i][j]},${increase_level}] `
            }
            format_string += "|\n"
        }
        format_string += `\n❌ Player #1: ${this.player[0].username}\n`
        format_string += "Token Available: 1 > "
        for(var i=0;i<5;i++){
            if(this.player[0].token[i])
                format_string += "✅ "
            else
                format_string += "✖️ "
        }
        format_string += "< 5"
        format_string += '\n\n'
        format_string += `⭕ Player #2: ${this.player[1].username}\n`
        format_string += "Token Available: 1 > "
        for(var i=0;i<5;i++){
            if(this.player[1].token[i])
                format_string += "✅ "
            else
                format_string += "✖️ "
        }
        format_string += "< 5"
        format_string += "\n\nTo Play Type: j!nxo play <row> <col> <level>\n```"
        return format_string
    }

    placeBlock(a,b,level){
        if(!this.player[this.turn].token[level] || this.board.level[a][b] >= level) return -1
        if(this.board.owner[a][b] == '➖' || this.board.level[a][b] < level){
            this.board.owner[a][b] = TokenIcon[this.turn]
            this.board.level[a][b] = level
            this.player[this.turn].token[level] = 0

            var win_result = this.isWin()
            if(win_result == 1){
                return this.turn + 1
            }
            else if(win_result == 2){
                return 3
            }
            this.turn = Number(!this.turn)
        }
        return 0
        /* 
        0   - Game must go on
        1,2 - Player 1,2 Win
        3   - Draw
        */
    }

    availableToken(){
        for(var i=0;i<2;i++){
            for(var j=0;j<5;j++){
                if(this.player[i].token[j])
                    return 1
            }
        }
        return 0
    }

    isWin(){
        this.isValid = false
        for(var i=0;i<3;i++){
            if(this.board.owner[i][0] != '➖' && this.board.owner[i][0] == this.board.owner[i][1] && this.board.owner[i][1] == this.board.owner[i][2]) return 1
            if(this.board.owner[0][i] != '➖' && this.board.owner[0][i] == this.board.owner[1][i] && this.board.owner[1][i] == this.board.owner[2][i]) return 1
        }
        if(this.board.owner[0][0] != '➖' && this.board.owner[0][0] == this.board.owner[1][1] && this.board.owner[1][1] == this.board.owner[2][2]) return 1
        if(this.board.owner[2][0] != '➖' && this.board.owner[2][0] == this.board.owner[1][1] && this.board.owner[1][1] == this.board.owner[0][2]) return 1
        
        if(!this.availableToken()) return 2

        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                if(this.board.owner[i][j] != '➖'){
                    this.isValid = true
                    return 0
                }
            }
        }
        return 2
    }

    async updateMatchStatus(){
        const response = await axios.patch(IP_ADDRESS,{
            match_id:   this.match_id,
            isValid:    this.isValid,
            player:     this.player,
            board:      this.board,
            turn:       this.turn
        })
        return response
    }

    async endgame(){
        console.log("DISABLE GAME")
        const response = await axios.patch(`${IP_ADDRESS}/disable?uid=${this.player[this.turn].uid}`)
        console.log(response)
        return response
    }
}

// (async()=>{
//     let result = await getMatch('12345')
//     result = result.data.data
//     var game = new NextLevelXO(result.match_id,result.isValid,result.player,result.board,result.turn)
//     var res = game.placeBlock(1,1,3)
//     console.log(res)
//     console.log(game.showBoard())
//     var resp = game.updateMatchStatus()
//     console.log("DONE",resp)
// })()


module.exports = {
    getMatch,
    getNXOData,
    createMatch,
    NextLevelXO
}




// game.placeBlock(1,2,3)
// game.placeBlock(1,1,4)
// game.placeBlock(0,0,2)
// game.placeBlock(0,1,1)
// game.placeBlock(2,2,0)
// game.placeBlock(2,1,0)
// game.showBoard()

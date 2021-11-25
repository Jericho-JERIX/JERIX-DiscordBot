class Player{
    constructor(maxhp,hp,maxmp,mp,atk,ran,def,evd,item){
        this.maxhp = maxhp
        this.hp = hp
        this.maxmp = maxmp
        this.mp = mp
        this.atk = atk
        this.ran = ran
        this.def = def
        this.evd = evd

        this.item = item
    }

    attacking(Enermy){
        Enermy.hp -= this.atk
    }

    defending(Enermy){
        
    }

}
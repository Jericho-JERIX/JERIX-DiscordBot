class Graph{
  constructor(graph=Test,story=Story){
    this.path = graph
    this.story = story
    this.current = 0
    this.ending = false
    this.choice = []
  }
  show(){
    this.choice = [0]
    if(this.ending){
      return
    }
    for(var i=0;i<this.path.length;i++){
      if(this.path[this.current][i] != 0){
        this.choice.push(i)
        console.log(`    > ${this.path[this.current][i].select}`)
      }
    }
  }
  go(index=0,auto=false){
    if(this.path[this.current][index] != 0){
      this.current = index
    }
    if(index!=0 && !auto){
      console.log(`You Choose >> ${this.story[this.current].select}`)
    }
    if(this.path[this.current].ending){
      this.ending = true
    }
    console.log(`${this.story[this.current].consequence}`)

    var found_count = 0,found_index = 0
    for(var i=0;i<this.path[this.current].length;i++){
      if(this.path[this.current][i] != 0){
        found_index = i
        found_count++
      }
    }
    if(found_count == 1){
      this.go(found_index,true)
    }

  }
}

class Dialogue{
  constructor(title,text,end=false){
    this.select = title
    this.consequence = text
    this.ending = end
  }
}

const Story = [
  new Dialogue(null,'A'),
  new Dialogue('B','Nice'),
  new Dialogue('C','Eat Shit'),
  new Dialogue(null,'Good Ending',true),
  new Dialogue(null,'Bad Ending',true) 
]

const Test = [
  // 0 1 2 3 4 5 6
    [0,Story[1],Story[2],0,0],
    [0,0,0,Story[3],0],
    [0,0,0,0,Story[4]],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]

// var game = new Graph(Test,Story)

// game.go()
// game.show()
// game.go(game.choice[1])
// game.show()

module.exports = {
  Graph,Dialogue,Test,Story
}
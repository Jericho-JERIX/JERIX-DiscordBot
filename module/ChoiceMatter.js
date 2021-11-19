const BinaryTree = require('./ADT').BinaryTree

class Choice{
    constructor(label,ending=false){
      this.label = label
      this.ending = ending
    }
}

var Tree = new BinaryTree("Enter Number")

Tree.insert("Enter Number","525413")
Tree.insert("Enter Number","745621")

Tree.insert("525413","1111111")
Tree.insert("525413","2222222")
Tree.insert("745621","4444444")
Tree.insert("745621","9999999")

Tree.BFS()
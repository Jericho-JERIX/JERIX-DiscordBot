class Stack{
    constructor(){
        this.data = []
        this.size = 0
    }

    add(value){
        this.size ++
        this.data.push(value)
    }

    take(){
        if(this.size == 0){
            return null
        }
        this.size --
        return this.data.pop()
    }
    log(){
        var format_log = ""
        for(var i=0;i<this.data.length;i++){
            format_log += `${this.data[i]} `
        }
        console.log(format_log)
    }
}

class MaxHeap{
    constructor(){
        this.data = [null]
        this.size = 1
    }

    // ADD NEW
    insert(value){
        this.data.push(value)
        this.percolateUp(Math.floor(this.size))
        this.size++
    }

    // TAKE OUT MAX VALUE
    popMax(){
        if(this.size == 1)
            return
        this.size--
        var pop_value = this.data[1]
        this.data[1] = this.data[this.size]
        this.data.pop()
        this.percolateDown(1)
        return pop_value
    }

    // HEAP SORT
    sort(){
        var sort_data = []
        while(this.size > 1){
            sort_data.push(this.popMax())
        }
        this.data = sort_data
    }

    swap(ia,ib){
        var tmp = this.data[ia]
        this.data[ia] = this.data[ib]
        this.data[ib] = tmp
    }

    percolateUp(index){
        if(Math.floor(index/2) == 0){
            return
        }
        else if(this.data[Math.floor(index/2)] < this.data[index]){
            this.swap(index,Math.floor(index/2))
            this.percolateUp(Math.floor(index/2))
        }
    }

    percolateDown(index){
        if(index*2+1 < this.size){
            if(this.data[index*2] < this.data[index*2+1] && this.data[index] < this.data[2*index+1]){
                this.swap(index,2*index+1)
                this.percolateDown(2*index+1)
            }
            else if(this.data[index] < this.data[index*2]){
                this.swap(index,2*index)
                this.percolateDown(2*index)
            }
        }
        else if(index*2 < this.size && this.data[index] < this.data[index*2]){
            this.swap(index,2*index)
            this.percolateDown(2*index)
        }
    }

    log(init=""){
        // console.log(this.data)
        var format_log = init
        for(var i=0;i<this.data.length;i++){
            format_log += `${this.data[i]} `
        }
        console.log(format_log)
    }
}

class BinaryTree{
    constructor(value){
        this.data = value
        this.left = null
        this.right = null
    }

    insert(parent,value){
        if(this == null)
            return
        if(this.data == parent){
            if(this.left == null){
                this.left = new BinaryTree(value)
                return
            }
            this.right = new BinaryTree(value)
            return
        }
        this.left.insert(parent,value)
        this.right.insert(parent,value)
    }

    BFS(){
        if(this == null)
            return
        console.log(this.data)
        if(this.left != null)
            this.left.BFS()
        if(this.right != null)
            this.right.BFS()
    }
}

module.exports = { Stack , MaxHeap , BinaryTree }
function swap(arr,a,b){
    var tmp = arr[a]
    arr[a] = arr[b]
    arr[b] = tmp
}

function randint(l=0,u=1){
    return Math.floor((Math.random()*(u-l+1)))+l
}

function shuffle(arr){
    for(var i=0;i<arr.length*10;i++){
        swap(arr,randint(0,arr.length-1),randint(0,arr.length-1))
    }
}

module.exports = {
    randint,shuffle
}
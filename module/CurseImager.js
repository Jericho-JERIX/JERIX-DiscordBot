var Jimp = require("jimp")

var CurseImager = {
    currentImage: {},
    image: {},

    addNewImage: async function(name,url){
        this.image[name] = await Jimp.read(url)
        this.changeCurrentImage(name)
    },

    changeCurrentImage: function(name){
        for(var i in this.image){
            if(this.image[i] == name){
                this.currentImage = this.image[i]
                return true
            }
        }
        return false
    },

    changeRGB: function(r,g=r,b=r){
        for(var i=0;i<this.currentImage.bitmap.data.length;i++){
            if(i % 3 == 0){
                this.currentImage.bitmap.data[i] += r % 255
            }
            if(i % 3 == 1){
                this.currentImage.bitmap.data[i] += g % 255
            }
            if(i % 3 == 2){
                this.currentImage.bitmap.data[i] += b % 255
            }
        }

    }
}

module.exports = {
    CurseImager
}
const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs')
const { MessageAttachment } = require('discord.js')

async function imageGenerator(name,config){
    const terminal = `./module/resource/img/${name}.png`
    const html = fs.readFileSync(`./templates/${name}.html`,'utf-8')
    const buffer = nodeHtmlToImage({/* output: terminal, */html: html,...config})
    return new MessageAttachment(buffer,`${name}.png`)
    // await nodeHtmlToImage({/* output: terminal, */html: html,...config})
    // return terminal
}

// (async ()=> {
//     const x = await imageGenerator('nametag',{selector: 'h1',content: {content: "Hello"}})
//     console.log(x)
// })()

module.exports = {
    Nametag: (text) => {
        return imageGenerator('nametag',{selector: 'h1',content: {content: text}})
    }
}
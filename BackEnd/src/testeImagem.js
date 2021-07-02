const fs = require("fs")

fs.createReadStream("./imagem/deku.jpg")
    .pipe(fs.createWriteStream("./imagem/deku-stream.jpg"))
    .on("finish",()=>{
        console.log("Deku escrito com sucesso");
    })

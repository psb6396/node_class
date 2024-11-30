const fs = require('fs')

function readFileAndUppercase(filePath) {
   fs.readFile(filePath,'utf-8', (err,data)=>{
      if (err){
         throw err
      }
      
      console.log(data.toUpperCase())
   })
}

readFileAndUppercase('./input.txt')

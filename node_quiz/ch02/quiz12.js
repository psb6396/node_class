const fs = require('fs')

function copyFileWithStreams(srcPath, destPath) {
   // 스트림(createReadStream과 createWriteStream)을 사용해 source.txt 파일을 destination.txt로 복사하는 프로그램을 작성
   const readStream = fs.createReadStream(srcPath)
   const writeStream = fs.createWriteStream(destPath)
   readStream.pipe(writeStream)
}

copyFileWithStreams('source.txt', 'destination.txt')

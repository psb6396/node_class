//buffer로 읽었을때 메모리를 얼마나 사용하는지 확인

const fs = require('fs')

//현재 메모리 사용량 확인
console.log('before:', process.memoryUsage().rss) //rss -프로세스가 사용중인 메모리

const readStream = fs.createReadStream('./big.txt')
const writeStream = fs.createWriteStream('./big3.txt')
readStream.pipe(writeStream)
console.log('buffer:', process.memoryUsage().rss)

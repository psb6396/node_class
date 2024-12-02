//buffer로 읽었을때 메모리를 얼마나 사용하는지 확인

const fs = require('fs')

//현재 메모리 사용량 확인
console.log('before:', process.memoryUsage().rss) //rss -프로세스가 사용중인 메모리

const data1 = fs.readFileSync('./big.txt') //파일을 동기적으로 읽기
fs.writeFileSync('./big2.txt', data1) //읽어들인 파일을 big2.txt 에 동기적으로 쓰기

console.log('buffer:', process.memoryUsage().rss)

//비동기 방식으로 파일 읽기
const fs = require('fs').promises

console.log('시작')

fs.readFile('./readme2.txt')
   .then((data) => {
      console.log('1번', data.toString())
      return fs.readFile('./readme2.txt')
   })
   .then((data) => {
      console.log('2번', data.toString())
      return fs.readFile('./readme2.txt')
   })
   .then((data) => {
      console.log('3번', data.toString())
      console.log('끝')
   })
   .catch((err) => {
      console.error(err)
   })

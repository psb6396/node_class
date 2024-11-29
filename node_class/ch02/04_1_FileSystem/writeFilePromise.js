const fs = require('fs').promises

fs.writeFile('./writeme2.txt', '글이 입력됩니다.')
   .then(() => {
      console.log('파일쓰기 완료')
      return fs.readFile('./writeme2.txt')
   })
   .then((data) => {
      console.log(data.toString())
   })
   .catch((err) => {
      console.err(err)
   })

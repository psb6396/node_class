const fs = require('fs')

const writeStream = fs.createWriteStream('./writeme2.txt')

//'finish' 이벤트 : 쓰기 스트림 종료되었을 때 콜백함수 실행
writeStream.on('finish', () => {
   console.log('파일 쓰기 완료')
})

writeStream.write('이 글을 씁니다.\n')
writeStream.write('한 번 떠 씁니다.')

writeStream.end()

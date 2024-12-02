const fs = require('fs').promises
const constants = require('fs').constants //파일 시스템 관련 상수를 가져온다.

// './folder' 에 대한 접근 권한 확인
// F_OK: 파일 존재 여부, W_OK: 쓰기 권한 여부, R_OK: 읽기 권한 여부가 있는지 확인
// 권한이 없다면 에러 발생
fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
   .then(() => {
      return Promise.reject('이미 폴더 있음')
   })
   .catch((err) => {
      if (err.code === 'ENOENT') {
         // 폴더 생성
         console.log('폴더 없음')
         return fs.mkdir('./folder')
      }
      //다른 에러는 그대로 전달
      return Promise.reject(err)
   })

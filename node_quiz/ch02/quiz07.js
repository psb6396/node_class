// 조건:
// 1. 총 메모리 용량 (GB 단위)과 사용 가능한 메모리 용량 (GB 단위)을 출력하세요.
// 2. Node.js의 `os` 모듈을 사용하세요.

const os = require('os')

// 여기에 코드를 작성하세요.
console.log(os.totalmem())
console.log(os.freemem())

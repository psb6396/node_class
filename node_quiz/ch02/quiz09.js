// 조건:
// 1. 주어진 URL에서 호스트 이름을 추출하세요.
// 2. Node.js의 `url` 모듈을 사용하세요.

const url = require('url')
const { URL } = url

const website = 'https://www.example.com/path?query=123'
const myURL = new URL(website)

console.log(myURL.host)
// 여기에 코드를 작성하세요.

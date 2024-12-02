// 조건:
// 1. URL의 쿼리 문자열에서 `query` 값과 `page` 값을 추출하세요.
// 2. Node.js의 `URLSearchParams`를 사용하세요.

const queryString = '?query=JavaScript&page=2'

// 여기에 코드를 작성하세요.
const { URL, URLSearchParams } = require('url')

const myurlparams = new URLSearchParams(queryString)
console.log(myurlparams.get('query'))
console.log(myurlparams.get('page'))
// console.log(myurl.searchParams.get('query'))
// console.log(myurl.searchParams.get('page'))
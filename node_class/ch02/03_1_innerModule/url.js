const url = require('url')

const { URL } = url
const myURL = new URL('https://www.naver.com')

console.log(myURL)
console.log(url.format(myURL))

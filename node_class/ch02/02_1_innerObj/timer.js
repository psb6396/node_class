// const timeout = setTimeout(() => {
//    console.log('1.5초후 실행')
// }, 1500)

// const intervel = setInterval(() => {
//    console.log('1초마다 실행')
// })

// setTimeout(() => {
//    clearTimeout(timeout) // 7초 뒤 settimeout 중지
//    clearInterval(intervel) //7초뒤 setinterval 중지
// }, 7000)

//setTimeout(함수,0)보다 setImmediate이 먼저 실행되기는 하지만 항상 그렇지는 않으므로 두개를 같이 사용하기 권장하질 X
const immerdiate = setImmediate(() => {
   console.log('즉시실행')
})
const immerdiate2 = setImmediate(() => {
   console.log('실행되지 않습니다.')
})

clearImmediate(immerdiate2)

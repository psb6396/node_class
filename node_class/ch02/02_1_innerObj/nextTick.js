//즉시실행
setImmediate(() => {
   console.log('immediate')
})

process.nextTick(() => {
   console.log('nextTick')
})
//process.nexttick은 settimeout이나 setimmediate보다 먼저 실행된다.

setTimeout(() => {
   console.log('timeout')
}, 0)

Promise.resolve().then(() => console.log('promise'))
//

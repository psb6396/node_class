const a = true

// es모듈은 특정 조건절에 사용X
// if (a) {
//    import './func.mjs'
// }

if (a) {
   await import('./func.mjs')
}

console.log('성공')

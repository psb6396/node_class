// const checkNumber = require('./func')

// console.log('checkNumber:', checkNumber(10))
// console.log('checkNumber:', chceckNumber(9))

//2. require함수이고 함수는 객체 require는 객체로서 속성을 가지고 있음

// console.log(require.main)

//require는 가장 위에 오지 않아도 된다
// require('./ment')

//3. 순환참조 문제
//순환참조(서로가  서로를 require) 시 일부결과가 제대로 나오지 않을 수 있으므로 사용하지 않도록 주의
const insideDep1 = require('./dep1')
const insideDep2 = require('./dep2')

insideDep1()
insideDep2()

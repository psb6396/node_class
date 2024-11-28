const string = 'abc'
const number = 1
const boolean = true
const obj = {
   outside: {
      inside: {
         key: 'value',
      },
   },
}

console.table([
   { name: '제로', birth: 1994 },
   { name: 'hero', birth: 1988 },
])

console.dir(obj, { colors: false, depth: 2 })
console.dir(obj, { colors: true, depth: 1 })

console.time('실행 시간측정')
for (let i = 0; i < 100000; i++) {}
console.timeEnd('실행 시간측정')

function b() {
   console.trace('에러 위치 추적') //에러가 어디서 발생했는지 추적하게 해줌.
}

function a() {
   b()
}
a()

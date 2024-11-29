const path = require('path')

const string = __filename
console.log(string)

console.log('경로 정보 정리--------------------')
console.log(path.dirname(string)) //경로의 구분자를 알려줌
console.log(path.extname(string)) //파일의 확장자
console.log(path.basename(string)) //파일의 이름 표시
console.log(path.basename(string, '.js')) //파일의 이름에서 확장자 제거

console.log('경로조작 ----------------------')
console.log(path.parse(string))
console.log(
   path.format({
      root: 'C:\\',
      dir: 'C:\\Users\\EZENIC-017\\Desktop\\node_class\\node_class\\ch02\\03_1_innerModule',
      base: 'path.js',
      ext: '.js',
      name: 'path',
   })
)

console.log(path.normalize('C:UsersEZENIC-017Desktop//node_class//node_classch02//03_1_innerModule'))

console.log('경로 성격 확인--------------')
console.log(path.isAbsolute('C:\\'))
console.log(path.isAbsolute('./home'))

console.log('경로계산 --------------------------')
console.log(path.relative('C:\\UsersEZENIC-017Desktop\\node_class\\node_classch02\\03_1_innerModule'))

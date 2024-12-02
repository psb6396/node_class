const EventEmitter = require('events')

//이벤트 객체 생성
const myEvent = new EventEmitter()

//event1 추가
myEvent.addListener('event1', () => {
   console.log('이벤트1')
})

//event2 에 리스너 2개 추가
myEvent.on('event2', () => {
   console.log('이벤트2')
})

myEvent.on('event2', () => {
   console.log('이벤트2 추가')
})

myEvent.once('event3', () => {
   console.log('이벤트3')
})

//이벤트 호출
myEvent.emit('event1')
myEvent.emit('event2')
myEvent.emit('event3')
myEvent.emit('event3')
myEvent.emit('event3')

myEvent.on('event4', () => {
   console.log('이벤트 4')
})

//이벤트 제거
myEvent.removeAllListeners('event4') //모든 이벤트 제거
myEvent.emit('event4') //실행안됨

myEvent.on('event5', () => {
   console.log('이벤트 5 추가')
})
myEvent.emit('event5')

myEvent.removeListener('event5')

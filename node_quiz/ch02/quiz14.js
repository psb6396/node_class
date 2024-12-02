const EventEmitter = require('events')
const fs = require('fs')

const myEmitter = new EventEmitter()

myEmitter.addListener('dataReceived', () => {
   console.log('Hello, Node.js!')
})

// fs.watch('./quiz14.js')

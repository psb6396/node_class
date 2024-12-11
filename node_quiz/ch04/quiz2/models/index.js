const Sequelize = require('sequelize')
const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const db = {}

dotenv.config()

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize

// db 객체를 모듈로 내보내어 다른 파일에서 사용할 수 있도록 설정
module.exports = db

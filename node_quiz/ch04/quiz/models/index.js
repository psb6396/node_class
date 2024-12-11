const Sequelize = require('sequelize')

const User = require('./user')
const Profile = require('./profile')

const Author = require('./author')
const Book = require('./book')

const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const db = {}

dotenv.config()

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize

db.User = User
db.Profile = Profile

db.Author = Author
db.Book = Book

// 모델을 초기화하고 데이터베이스와 연결
User.init(sequelize)
Profile.init(sequelize)

Author.init(sequelize)
Book.init(sequelize)

// 모델의 관계 설정 (예: 외래 키, 연관 테이블 등)
User.associate(db)
Profile.associate(db)

Author.associate(db)
Book.associate(db)

// db 객체를 모듈로 내보내어 다른 파일에서 사용할 수 있도록 설정
module.exports = db

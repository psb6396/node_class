const Sequelize = require('sequelize')
const User = require('./user')
const Comment = require('./comment')

const Country = require('./country')
const Capital = require('./capital')

const dotenv = require('dotenv')
//현재 실행환경을 가져옴
const env = process.env.NODE_ENV || 'development'

//가져온 실행환경에 맞는 db설정을 가져옴
const config = require('../config/config')[env]
const db = {}
dotenv.config()

// sequelize 객체를 사용해서 데이터베이스 연결 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config)

//db객체를 생성하여 sequelize 객체와 모든 모델들을 저장
db.sequelize = sequelize

//User 모델과 Comment 모델을 db객체에 추가
db.User = User
db.Comment = Comment

db.Country = Country
db.Capital = Capital

//모델을 초기화하고 데이터베이스와 연결
User.init(sequelize)
Comment.init(sequelize)

Country.init(sequelize)
Capital.init(sequelize)

//모델과의 관계 설정(예 - 외래키, 연관 테이블 등)
User.associate(db)
Comment.associate(db)

Country.associate(db)
Capital.associate(db)

module.exports = db
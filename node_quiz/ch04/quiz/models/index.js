const Sequelize = require('sequelize')

const User = require('./user')
const Profile = require('./profile')

const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const db = {}

dotenv.config()

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize

db.User = User
db.Profile = Profile

User.init(sequelize)
Profile.init(sequelize)

module.exports = db

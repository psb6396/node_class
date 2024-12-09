const Sequelize = require('sequelize')
const { associate } = require('../../../../node/ch04/models/user')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            username: {
               type: Sequelize.STRING(50),
               allowNull: false,
            },
            email: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
         },
         {
            modelName: 'User',
            tableName: 'users',
            timestamps: false, // 자동 생성되는 'createdAt'과 'updatedAt' 필드를 비활성화
            charset: 'utf8mb4', // 유니코드 4바이트 문자셋 (이모지 지원)
            collate: 'utf8mb4_general_ci', // 대소문자를 구분하지 않는 정렬 규칙
         }
      )
   }
   static associate(db) {
      db.User.hasOne(db.Profile, {
         foreignKey: 'UserId',
         sourceKey: 'id',
      })
   }
}

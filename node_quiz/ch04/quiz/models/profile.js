const Sequelize = require('sequelize')

module.exports = class Profile extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            bio: {
               type: Sequelize.STRING(255),
               allowNull: true,
            },
            avatarUrl: {
               type: Sequelize.STRING(255),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: false, // 자동 생성되는 'createdAt'과 'updatedAt' 필드를 비활성화
            underscored: false,
            modelName: 'Profile',
            tableName: 'profiles',
            paranoid: false,
            charset: 'utf8mb4', // 유니코드 4바이트 문자셋 (이모지 지원)
            collate: 'utf8mb4_general_ci', // 대소문자를 구분하지 않는 정렬 규칙
         }
      )
   }
   static associate(db) {
      db.Profile.belongsTo(db.User, {
         foreignKey: 'UserId',
         targetKey: 'id',
      })
   }
}

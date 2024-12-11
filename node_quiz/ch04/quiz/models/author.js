const Sequelize = require('sequelize')
// const { init } = require('../../../../node_class/ch04/models/user')

module.exports = class Author extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            name: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            age: {
               type: Sequelize.INTEGER.UNSIGNED,
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: false,
            modelName: 'Author',
            tableName: 'authors',
            charset: 'utf8mb4',
            //데이터베이스 생성할때 charset과 똑같이 사용
            // (디비버에서 설정한거!)
            collate: 'utf8mb4_general_ci',
            //데이터베이스 생성할때 collate와 똑같이 사용
            // (디비버에서 설정한거!)
         }
      )
   }
   static associate(db) {
      db.Author.hasMany(db.Book, {
         foreignKey: 'book_s_author',
         sourceKey: 'id',
      })
   }
}

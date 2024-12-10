const Sequelize = require('sequelize')

module.exports = class Book extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            title: {
               type: Sequelize.STRING(200),
               allowNull: false,
            },
            genre: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: false,
            modelName: 'Book',
            tableName: 'books',
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
      db.Book.belongsTo(db.Author, {
         foreignKey: 'book_s_author',
         targetKey: 'id',
      })
   }
}

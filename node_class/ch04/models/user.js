const Sequelize = require('sequelize')

// class명은 파일명과 똑같이 작성하되 대문자로 시작
module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init({
         //name 컬럼 정의
         name: {
            type: Sequelize.STRING(20), //varchar(20)
            allowNull: false, // null 제약조건 -> not null
            unique: true, //unique 제약조건 -> 중복허용X
         },
         //age컬럼 정의
         age: {
            type: Sequelize.INTEGER.UNSIGNED, //양수만 가능한 정수 int
            allowNull: false, // null 제약조건 -> not null
         },
         //married 컬럼 정의
         married: {
            type: Sequelize.BOOLEAN, //true,false값이 저장되는 tinyint
            allowNull: false, // null 제약조건 -> not null
         },
         //comment 컬럼 정의
         comment: {
            type: Sequelize.TEXT, // text
            allowNull: false, // null 제약조건 -> not null
         },
         //create_at 컬럼 정의
         create_at: {
            type: Sequelize.DATE, //날짜와 시간을 저장하는 datetime
            allowNull: false, // null 제약조건 -> not null
         },
      })
   }

   static associations(db) {}
}

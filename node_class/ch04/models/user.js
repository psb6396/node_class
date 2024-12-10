const Sequelize = require('sequelize')

//class명은 파일명과 똑같이 작성하되, 대문자로 시작
//class는 객체를 위한 설계도니까 .  .  .
module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      //테이블의 컬럼과 옵션을 정의
      return super.init(
         {
            //name컬럼 정의
            name: {
               type: Sequelize.STRING(20),
               // = varchar(20)
               allowNull: false,
               //null 제약조건 -> not null
               unique: true,
               //unique 제약조건 -> 중복허용 X
            },
            //age컬럼 정의
            age: {
               type: Sequelize.INTEGER.UNSIGNED,
               //Sequelize.INTEGER = 정수
               //INTEGER.UNSIGNED = 양수만 가능한 정수
               allowNull: false,
               //null 제약조건 -> not null
            },
            //married 컬럼 정의
            married: {
               type: Sequelize.BOOLEAN,
               //true, false값이 저장되는 타입 tinyint
               allowNull: false,
               //null 제약조건 -> not null
            },
            //comment 컬럼 정의
            comment: {
               type: Sequelize.TEXT,
               //text
               allowNull: false,
               //null 제약조건 -> not null
            },
            //create_at 컬럼 정의
            create_at: {
               type: Sequelize.DATE,
               //날짜와 시간을 저장하는 datetime
               allowNull: false,
               //null 제약조건 -> not null
               defaultValue: Sequelize.NOW,
               //디폴트값으로 현재 시간 설정
            },
         },
         {
            sequelize,
            timestamps: false,
            //자동생성되는 createAt과 updateAt 필드를 비활성화
            //createAt - 테이블에 데이터를 'insert'했을때 시간날짜 자동으로 insert
            //update -  테이블에 데이터를'수정'했을때 시간날짜 자동으로 insert
            underscored: false,
            //컬럼이름을 카멜케이스로 유지할건지 -> 유지X
            modelName: 'User',
            //시퀄라이즈에서 사용하는 모델이름(클래스명이랑 똑같이 작성. 단수형)
            tableName: 'users',
            // 데이터베이스에서 사용하는 실제 테이블 이름.복수형
            paranoid: false,
            //소프트 삭제 (soft delete)활성화 여부 -> 비활성화
            //소프트삭제 - 데이터베이스에서 데이터를 실제로 삭제하지 않고 삭제된것으로 표시만 하는 방식 -> 복구 가능
            charset: 'utf8mb4',
            //데이터베이스 생성할때 charset과 똑같이 사용
            // (디비버에서 설정한거!)
            collate: 'utf8mb4_general_ci',
            //데이터베이스 생성할때 collate와 똑같이 사용
            // (디비버에서 설정한거!)
         }
      )
   }

   //테이블의 관계를 정의
   static associate(db) {
      //User: Comment = 1:n관계
      //User가 Comment를 가지고 있다 (User가 부모테이블,Comment는 자식테이블)
      db.User.hasMany(db.Comment, {
         foreignKey: 'commenter',
         sourceKey: 'id',
         //User에서 Comment에게 외래키로 제공할 컬럼 이름
      })
   }
}

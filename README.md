# chatApp_api
node.js + mysql + ORM(sequelize)를 사용하여 만든 채팅 어플리케이션 api 서버 입니다. socket.io 추가 예정

## API
### users
1. `POST /users/signin`

   : 로그인

   -요청 데이터 형식

   ```
   # header
   	Content-Type : application/json
   
   # body
   {
   	"username" : "papico",
   	"password" : "~~~~~~"
   }
   ```

   -응답 데이터 형식

   - 성공

   ```
   {
       "success": true,
       "message": "로그인에 성공하였습니다.",
       "token": token
   }
   ```

   - 실패

   ```
   {
       "success": false,
       "message": "회원 아이디와 비밀번호 정보가 일치하지 않습니다."
   }
   ```

2. `POST /users/signup`

   : 회원가입

   -요청 데이터 형식

   ```
   # header
   	Content-Type : application/json
   
   # body
   {
   	"username" : "newbie",
   	"password" : "~~~~~~",
   	"description" : "newbie 입니다."
   }
   ```

   -응답 데이터 형식

   - 성공

   ```
   {
       "success": true,
       "message": "회원가입에 성공하였습니다."
   }
   ```

   - 실패

   ```
   {
       "success": false,
       "message": "이미 가입되어있는 계정입니다."
   }
   ```

3. `GET /users/info`

   : 유저 정보

   -요청 데이터 형식

   ```
   # header
   	authorization : token
   ```

   -응답 데이터 형식

   - 성공

   ```
   {
       "success": true,
       "message": "회원정보 로드에 성공하였습니다.",
       "data": {
           "uId": 4,
           "userName": "papico",
           "password": "~~~~~",
           "description": "papico 입니다.",
           "isOnline": false,
           "created_at": "2018-08-29T04:59:25.000Z",
           "updated_at": "2018-08-30T02:48:15.000Z"
       }
   }
   ```

   - 실패

   ```
   {
       "success": false,
       "message": "권한이 없습니다. 로그인을 진행해 주세요."
   }
   ```

4. `GET /users/logout`

   : 로그아웃

   -요청 데이터 형식

   ```
   # header
   	authorization : token
   ```

   -응답 데이터 형식

   - 성공

   ```
   {
       "success": true,
       "message": "로그아웃에 성공하였습니다."
   }
   ```

   - 실패

   ```
   {
       "success": false,
       "message": "권한이 없습니다. 로그인을 진행해 주세요."
   }
   ```


### messages

1. `POST /messages/message`

   : 메세지 작성

   -요청 데이터 형식

   ```
   # header
   	Content-Type : application/json
   	authorization : token
   # body
   {
   	"suid" : 4,
   	"ruid": 3,
   	"content" : "Me too"
   }
   ```

   -응답 데이터 형식

   - 성공

   ```
   {
       "success": true,
       "message": "메세지 전송에 성공하였습니다."
   }
   ```

   - 실패

   ```
   {
       "success": false,
       "message": "권한이 없습니다. 로그인을 진행해 주세요."
   }
   ```

2. `GET /messages/message/:r_uid`

   : 메세지 불러오기

   -요청 데이터 형식

   ```
   # header
   	authorization : token
   ```

   -응답 데이터 형식

   - 성공

   ```
   {
       "success": true,
       "message": "정상적으로 메세지를 가져왔습니다.",
       "data": [
           {
               "mId": 1,
               "sUid": "3",
               "rUid": "4",
               "content": "hello",
               "created_at": "2018-08-29T16:24:07.000Z",
               "updated_at": "2018-08-29T16:24:07.000Z"
           },
           {
               "mId": 2,
               "sUid": "4",
               "rUid": "3",
               "content": "Me too",
               "created_at": "2018-08-30T00:21:27.000Z",
               "updated_at": "2018-08-30T00:21:27.000Z"
           }
       ]
   }
   ```

   - 실패

   ```
   {
       "success": false,
       "message": "권한이 없습니다. 로그인을 진행해 주세요."
   }
   ```

3. `GET /messages/message`

   : 채팅 목록 불러오기

   -요청 데이터 형식

   ```
   # header
   	authorization : token
   ```

   -응답 데이터 형식

   - 성공

   ```
   {
       "success": true,
       "message": "방목록을 정상적으로 불러왔습니다.",
       "data": [
           {
               "uid": 3,
               "username": "test"
           }
       ]
   }
   ```

   - 실패

   ```
   {
       "success": false,
       "message": "권한이 없습니다. 로그인을 진행해 주세요."
   }
   ```

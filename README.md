# GraphQL
쿼리 종류가 다양하며 유연성이 높다  
  
## query(Operation type)
데이터를 검색하기 위해 POST 요청  
mutation: POST PUT PATCH DELETE  
Subscription: web socket 연결 설정

## user(Operation endpoint)  
실행하는 명령어

## name(Requested fields)
추출하고자 하는 속성  
  
위 쿼리를 넣어 서버로 보내면 분석이 진행된다.  
경로 /graphql는 Convetion  
쿼리 표현을 요청 본문에 넣기 위해 POST 메서드만 사용한다.  
서버 측에 있는 Resolver가 요청 본문을 분석 후 본문에 있는 쿼리 표현에 따라 데이터를 처리한다.

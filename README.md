1. nodeJs 설치
    nodeJs 명령어를 사용해서 
    파일을 설치하거나 버전을 업데이트하거나
    추가적으로 필요한 라이브러리나 프레임워크를 설치할 수 있음
    nodeJs = 앱스토어

2. nodeJS 항목에 있는 npx를 사용해서 react 세팅
    세팅 명령어 : npx careate-react-app 폴더명
    폴더명: 대문자 X, -(대시)와 소문자를 활용

    npm start를 사용해서 실행

    리액트를 실행 중 필요한 패키지 설치도 가능
    CSS
        npm i bootstrap //className으로 사용하는 bootstrap
        npm i react-bootstrap //컴포넌트(함수)로 사용하는 bootstrap
        npm i mui에 설치된 명령어 
    
    JS
        npm i react-router-dom
        npm i axios (fetch의 최신버전, get post 이용 가능)

    GET
        서버에 원하는 정보를 요청할 때 사용(read, select)
    POST
        form에 사용자가 작성한 데이터 내용을 백엔드로 전송
    
    **git 올릴 시 유의사항
        1) node_modules폴더, package-lock.json 파일 X
        2) package.json은 삭제 절대 금지
            > node_modules이나 package-lock.json이 없을 때는 npm i를 사용해서 둘 다 설치 가능하지만
            > package.json이 존재하지 않을 경우는 설치 불가능

3. Backend에서 데이터를 react(프론트엔드)로 전송 
    > 주로 DB에 있는 내용을 JSON 형식으로 변환해서 전달한다
    
    backend 세팅에 사용하는 명령어 : 
        mkdir 백엔드폴더명 (보통 server를 많이 쓴다)

        cd server로 들어가서 npm init (초기 세팅)

        npm i express oracledb cors /express, oracledb, cors 설치

        npm start로 실행

        nod js파일명.js (js 파일이 두 개 이상일 때 선택해서 파일 실행 가능)

        Front는 코드를 수정하면 가상의 DOM이 수정된 내용을 계속해서 반영해주기 때문에 자동 새로고침이 되지만, Backend는 한 번 껐다가 재실행 필요
        (만약 포트번호가 수정되면 둘 다 재실행)
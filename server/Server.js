
//oracledb, express 요청 함수
const oracledb = require('oracledb');
const express = require('express');
//여러 포토번호 사용을 위한 cors 불러오기
const cors = require('cors');

//가져온 express 사용하기 위한 app 생성
const app = express();

//서버 전용 포트번호
const PORT = 5001;

//express로 백엔드에서 가져온 데이터를 사용할 수 있도록 설정
//json파일로 DB 보이기
app.use(express.json());

//GET : 모든 경로에서 백엔드에 오는 요청을 사용할 수 있도록 허용
app.use(cors());

//POST : DB에 전달받을 url 주소도 허용
app.use(cors({origin : 'http://localhost:3000'}));

//DB 연결 정보
const dbConfig = {
    user : 'react',
    password : 'react',
    connectString : 'localhost:1521/xe',
};

//OracleDB 연결 위한 connection 및 SQL 쿼리 실행 함수
//async를 이용해서 비동기(정적) 작업을 수행
async function runQuery(sql){
    
    let connection;

    try{
        //await : 비동기적으로 연결 대기
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(sql);

        //쿼리 실행 결과
        return result.rows.map(row => ({
            ID : row[0],
            TASK : row[1],
            MEMO : row[2],
            DONE : row[3],
        }));
    } catch(err) {
        if(connection){
            try {
                await connection.close();
            } catch(err){
                console.log(err);
            }
        }
    }
}

//연결 테스트 링크
app.get("/", (request, response) => {
    response.send('백엔드 연결 완료');
});

//연결한 PORT에 정상적으로 연결 되었는지 확인
app.listen(PORT, ()=>{
    console.log(`SERVER started : http://localhost:${PORT}`);
})

//API 활용해서 쿼리에 작성한 내용 가져오기
app.get('/api/todos', async(request, response) => {
    const todos = await runQuery('SELECT * FROM todos');
    response.json(todos);
});

//POST로 전달 받을 쿼리 작성
app.post('/api/todos', async(request, response) => {
    const {task, memo} = request.body;
    console.log("데이터가 들어왔는지 확인", {task, memo});

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        await connection.execute(
            'INSERT INTO todos(id, task, memo) VALUES(todo_seq.NEXTVAL, :task, :memo)',
            {task, memo},
            {autoCommit: true} //data 집어넣었으면 자동으로 커밋도 되도록 하기
        );
        response.json({message: '성공적으로 저장되었습니다'});
    }catch(error){
        console.error("Error in POST /api/todos : ", error);
    }finally{
        if(connection){
            try {
                await connection.close();
            } catch(error){
                console.error("Connection 닫기 에러 : ", error);
            }
        }
    }
})
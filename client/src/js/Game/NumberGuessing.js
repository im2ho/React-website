import React,{useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProgressBar, Form, Button } from 'react-bootstrap';

export default function App() {

    //랜덤 숫자 설정
    const randomNumber = () => {
        return Math.floor(Math.random() * 50) + 1;
    };

    const [targetNumber, setTargetNumber] = useState(randomNumber());
    const [userGuess, setUserGuess] = useState('');
    const [message, setMessage] = useState('');

    //횟수제한
    const [attempts, setAttempts] = useState(5);

    //작성한 숫자 기록
    const [guessHistory, setGuessHistory] = useState([]);

    //숫자값이 들어올 때마다 값 변경
    const inputChange = (e) => {
        setUserGuess(e.target.value);
    };

    const [progress, setProgress] = useState(0);

    //useEffect를 활용해서 게임 횟수 제한
    useEffect(()=>{
        //5번의 기회 > 기회 감소
        //100에서부터 감소하는 표현식 100 - ((5-attempts)/5)*100
        const newProgress = ((5 - attempts) / 5) * 100;
        setProgress(newProgress);
        //횟수가 끝났을 경우
        if(attempts === 0){
            setMessage(`틀렸습니다! 행운의 숫자는 ${targetNumber}였습니다 메롱 아쉽지만 다음 기회를 노려보세요`);
            //targetNumber 재설정, 횟수 초기화, 사용자 작성 기록 지우기
            setTargetNumber(randomNumber());
            setAttempts(5);
            setGuessHistory([]);
            setProgress(0);
        }
    },[attempts, targetNumber])

    //숫자값 전달
    const inputSubmit = (e) => {
        //숫자 맞추기 전 자동 새로고침 방지
        e.preventDefault();
        //사용자가 입력한 값을 숫자로 변환
        const guess = parseInt(userGuess, 10);

        //숫자가 아닐 경우
        if(isNaN(guess)){
            setMessage('숫자만 입력이 가능합니다'); 
        } else { 
            //사용자가 작성한 숫자값을 기록하는 함수
            const newGuessHistory = [...guessHistory, guess];
            setGuessHistory(newGuessHistory);

            if(guess === targetNumber){
                setMessage(`행운의 숫자 ${targetNumber}에 당첨됐습니다^^`);

                //숫자 맞추고 초기화
                setTargetNumber(randomNumber());
                setAttempts(5);
                setGuessHistory([]);
                setProgress(0);
            } else {
                //숫자가 틀릴 때마다 횟수 차람
                const remainAttempts = attempts - 1;
                setAttempts(remainAttempts);
                setMessage(guess < targetNumber ? 'Up' : 'Down');
            }
        }
        //숫자를 맞출 때마다 input 박스 값이 지워지도록 초기화
        setUserGuess('');
    }; //inputSubmit()

    return (
        <div>
            <h1>행운의 숫자</h1>
            <p>1부터 50사이의 숫자를 맞춰보세요</p>
            <ProgressBar now={progress} label={`${progress}%`} /><br />
            <Form onSubmit={inputSubmit}>
                <input 
                    className="w-25"
                    type='number'
                    value={userGuess}
                    onChange={inputChange}
                    placeholder="숫자를 입력하세요"
                    min="1"
                    max="100"
                    required
                />
                <Button type="submit" className="ms-2">제출</Button>
            </Form>
            <div>
                <p>남은 기회 : {attempts}</p>
                <p>입력한 숫자 : {guessHistory.join(',')}</p>
            </div>
            {message && <div>{message}</div>}
        </div>
    );
};
import React,{useState} from "react";
import Board from './BoardList';

const CreatePage = () => {

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [date, setDate] = useState('');

    //게시물 목록..
    const [actions, setAction] = useState([]);

    //게시물 추가 함수
    const addAction = (newAction) => {
        setAction([...actions, newAction]);
    };

    //게시글 추가시 작동할 버튼에 대한 함수
    const handleSubmit = (e) => {
        e.preventDefault(); //자동 새로고침 방지

        //추가한 내용 넣어주기
        const newAction = {id, title, genre, date};
        addAction(newAction);

        //내용을 넣어주고 나서 초기화시키는 set (필수적 요소 X)
        setId(''); setTitle(''); setGenre(''); setDate('');
    }

    return(
        <div>
            <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit}>
                <label>Id : </label>
                <input 
                    type="text" 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                />
                <label>제목 : </label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>내용 : </label>
                <textarea 
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                /><br />
                <label>날짜 : </label>
                <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                /><br />
                <button type="submit">save</button>
            </form>
            <Board type="hidden" actions={actions}/>
        </div>
    )
}

export default CreatePage;
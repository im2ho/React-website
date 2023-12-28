import React,{useState} from "react";

const Board = () => {

    //게시글 목록
    const [actions, setAction] = useState([]);

    //삭제함수 (꼼수;)
    const deleteAction = (id) => {
        setAction(actions.filter((action) => action.id !==id));
    };

    function createBoard() {
        window.location.href="/boards/create";
    }

    return(
        <div>
            <h2>게시판 목록</h2>
            <ul>
                {actions.map(action => (
                    <li key={action.id}>
                        {action.title} - {action.genre} - {action.date}
                        <button onClick={() => deleteAction(action.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={createBoard}>게시글 작성</button>
        </div>
    )
}

export default Board;
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';

export default function App() {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({task:'', memo:''});

    //input에 입력한 데이터 DB에 저장하는 함수
    const addTodo = () => {
        axios
        .post('http://localhost:5001/api/todos', newTodo)
        .then(()=>{
            axios
            .get(`http://localhost:5001/api/todos?timestamp=${new Date().getTime()}`)
            .then((response) => {
                setTodos(response.data);
                setNewTodo({task:'', memo:''}); //DB에 입력값 저장 후 초기화
            })
            .catch(err => console.error('데이터 저장에 실패했습니다', err));
        })
        .catch(err => console.error('에러입니다',err));
    };

    //server에서 Express 활용해서 todos 데이터 가져오기
    useEffect(() => {
        const timestamp = new Date().getTime();
        axios.get(`http://localhost:5001/api/todos?timestamp=${timestamp}`)
        .then(response => {
            setTodos(response.data);
        })
        .catch(err => {
            console.log("Error!", err);
        });
    }, []);

    return (
        <div>
            <h1>할 일을 확인해보세요</h1>
            <Table border={1} style={{textAlign:"center"}}>
                <thead>
                    <th>no.</th>
                    <th>할 일</th>
                    <th>memo</th>
                </thead>
                <tbody>
                    {todos.map(todo => (
                    <tr key={todo.ID}>
                        <td>{todo.ID}</td>
                        <td>{todo.TASK}</td>
                        <td>{todo.MEMO}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>

            <h2 style={{marginTop:"20px"}}>할 일 추가</h2>
            <div>
                <label>Task : </label>
                <input 
                    type="text"
                    value={newTodo.task}
                    onChange={(e) => setNewTodo({...newTodo, task : e.target.value})}
                />
                <label>Memo : </label>
                <input 
                    type="text"
                    value={newTodo.memo}
                    onChange={(e) => setNewTodo({...newTodo, memo : e.target.value})}
                />
                <button onClick={addTodo}>할 일 추가</button>
            </div>
        </div>
    );
}
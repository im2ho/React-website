import React, { useEffect, useState } from 'react';

export default function TodoNoCss() {
  //할 일 목록 상태
  const [todos, setTodos] = useState([]);
  //추가할 할 일
  const [newTodo, setNewTodo] = useState('');
  //할 일 갯 수
  const [count, setCount] = useState(0);

  /********** 출시일 **********/
  const [date, setdate] = useState('');

  //수정할 할 일
  // 수정할 일 의 번호의 최초값을 0으로 주면
  // 0 번 째 인덱스에 있는 할 일을 수정하게 되므로
  // 최초값은 null 로 넣어준다.
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTodo, setEditTodo] = useState('');

  //할일 추가하는 버튼 함수 생성하기
  const addTodo = () => {
    /***날짜와 출시일 모두 입력해달라는 경고문 생성***/
    if (!date || !newTodo) {
      alert('출시일과 할 일을 입력해주세요.');
      return;
    }

    //만약에 이미 존재하는 할 일 일경우 추가되지 못하도록 방지
    if (!todos.includes(newTodo)) {
      //만약에 두 개 이상 저장할 경우 {} 사용해서 저장
      setTodos([...todos, { newTodo, date }]);

      //setTodos([...todos, newTodo]);
      setNewTodo('');
      // 카운트는 선택
      setCount((count) => count + 1);
    } else {
      alert('이미 존재하는 할 일 입니다!');
    }
  };

  //삭제
  const removeTodo = (index) => {
    const updateTodos = [...todos]; //할일 목록 복제
    updateTodos.splice(index, 1); //index 자리값 1 하나만 삭제
    setTodos(updateTodos); //변경된 내용으로 값 저장하기
    // 카운트 숫자 변경 (선택)
    setCount((count) => count - 1);
  };

  //수정 시작하기 버튼
  //              index : 수정할 내용 자리값
  //              todo : 수정할 일 내용 갖고오기
  const editStart = (index, todo) => {
    setEditingIndex(index);

    /*
    수정을 진행할 경우 할 일 목록에 있는 할일만 가져올예정
    왜냐하면 날짜는 수정하고 싶을 수 있을 수 있으니 그대로 가져오지 않은 것
     */
    setEditTodo(todo.newTodo);
    // setEditTodo(todo);
  };

  //수정한 내용 저장하는 버튼
  const saveEdit = () => {
    const updateTodos = [...todos];
    //작성일과 수정한 내용을 모두 저장하기 위해서는 배열을 이용해야함
    //updateTodos[editingIndex] = {newTodo: editTodo, date};
    //newTodo 의 경우 수정한 내용을 새로 넣어주기 때문에 값 대칭을 해준것
    //date 같은 경우 처음부터 선택하게 만들 예정이기 때문에
    //date만 넣어줌
    updateTodos[editingIndex] = { newTodo: editTodo, date };
    //배열에 작성한 내용을 저장해주는 set 작성
    setTodos(updateTodos);

    //updateTodos(editingIndex);
    setEditingIndex(null);
  };

  //수정을 취소하고 싶을 때 취소하기 버튼
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditTodo('');
  };

  //선택
  useEffect(() => {
    document.title = `할 일 갯수 : ${count}`;
  }, [count]);

  return (
    <>
      <h3>할 일 목록</h3>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setdate(e.target.value)}
        />
        <button onClick={addTodo}>할 일 추가하기</button>
      </div>
      {/* 할 일 목록 보여주기*/}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                />
                <button onClick={saveEdit}>수정 완료하기</button>
                <button onClick={cancelEdit}>수정하기 취소</button>
              </div>
            ) : (
              <div>
                {`${todo.newTodo} 출시일 : ${todo.date}`}
                <button onClick={() => editStart(index, todo)}>수정하기</button>
                <button onClick={() => removeTodo(index)}>삭제하기</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
import React, {useState} from "react";

import BoardList from "./BoardList";
import CreatePage from "./CreatePage";

export default function Board(){

    //
    

    //게시글 목록
    const [actions, setAction] = useState([]);

    //생성
    const addAction = (newAction) => {
        setAction([...actions, newAction]);
    };

    //삭제 (꼼수;)
    const deleteAction = (id) => {
        setAction(actions.filter((action) => action.id !==id));
    };

    return(
            <div>
               <BoardList actions={actions} deleteAction={deleteAction} />
               <CreatePage actions={actions} addAction={addAction} />
            </div>
    )
}
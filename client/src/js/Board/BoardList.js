import React from "react";

const ListPage = ({actions, deleteAction}) => {
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
        </div>
    )
}

export default ListPage;
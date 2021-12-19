import React from "react";

export const SearchPanel = (props) => {
    
    
    const {param, setParam, users} = props;
    return (
        <form>
            <input type="text" value={param.name} onChange={ e => setParam({
                ...param,
                name: e.target.value
            })}/>
            <select value={param.personId} onChange={e => setParam({
                ...param,
                personId: e.target.value
            })}>
                <option value="">负责人</option>
                {
                    users.map(user => {
                        return <option key={user.id} value={user.id}>{user.name}</option>
                    })
                }
            </select>
        </form>
    )
}

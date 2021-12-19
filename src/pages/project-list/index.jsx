import React from "react";
import  qs from 'qs';
import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from './list';
import { cleanObject } from './../../utils/index';
export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: "",  //搜索框中的项目姓名
        personId: ""  // 下拉框中选中的用户id
    });
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (response) => {
            if(response.ok) {
                setList(await response.json());
            }
        })
    }, [apiUrl, param]);
    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async (response) => {
            if(response.ok) {
                setUsers(await response.json());
            }
        })
    }, [apiUrl])
    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users}/>
            <List list={list} users={users}/>
        </div>
    )
}
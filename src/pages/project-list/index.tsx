import React from "react";
import qs from "qs";
import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject } from "../../utils/index";
import { useMount } from "../../utils/index";
import { useDebounce } from "../../utils/index";
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "", //搜索框中的项目姓名
    personId: "", // 下拉框中选中的用户id
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  // 解决用户在输入框输入内容时不断发送请求的问题
  const debounceParam = useDebounce(param, 200);
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [debounceParam]);
  // 只在页面加载的时候执行一次，因此依赖数组为空，在utils中封装了useMount自定义hook
  // useEffect(() => {
  //     fetch(`${apiUrl}/users`).then(async (response) => {
  //         if(response.ok) {
  //             setUsers(await response.json());
  //         }
  //     })
  // }, []);
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

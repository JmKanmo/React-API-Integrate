import React, { useState } from "react";
import axios from "axios";
// import useAsync from "./useAsync";
import { useAsync } from "react-async";
import User from "./User";

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

function Users() {
  const { data: users, error, isLoading, reload, run } = useAsync({
    deferFn: getUsers,
  });
  const [userId, setUserId] = useState(null);

  if (isLoading) {
    return <div>로딩중..</div>;
  }
  if (error) {
    return <div>에러발생</div>;
  }
  if (!users) {
    return <button onClick={() => run()}>불러오기</button>;
  }

  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => {
              setUserId(user.id);
            }}
          >
            {user.name}
            {user.username}
            {user.email}
            {user.phone}
            {user.website}
          </li>
        ))}
      </ul>
      <button onClick={() => reload()}>테스트</button>
      {userId && <User id={userId} />}
    </>
  );
}
export default Users;

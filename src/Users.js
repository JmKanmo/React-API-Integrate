import React, { useState } from "react";
// import useAsync from "./useAsync";
// import { useAsync } from "react-async";
import User from "./User";
import { useUsersState, useUsersDispatch, getUsers } from "./UsersContext";

// async function getUsers() {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/users"
//   );
//   return response.data;
// }

function Users() {
  // const { data: users, error, isLoading, reload, run } = useAsync({
  //   deferFn: getUsers,
  // });
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  const [userId, setUserId] = useState(null);
  const { loading, data: users, error } = state.users;

  const fetchData = () => {
    getUsers(dispatch);
  };

  if (loading) {
    return <div>로딩중..</div>;
  }
  if (error) {
    return <div>에러발생</div>;
  }
  if (!users) {
    return <button onClick={() => fetchData()}>불러오기</button>;
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
      <button onClick={() => fetchData()}>테스트</button>
      {userId && <User id={userId} />}
    </>
  );
}
export default Users;

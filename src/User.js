import React from "react";
import axios from "axios";
// import useAsync from "./useAsync";
import { useAsync } from "react-async";

async function getUser({ id }) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User({ id }) {
  const { data: user, error, isLoading } = useAsync({
    promiseFn: getUser,
    id,
    watch: id,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생햇습니다</div>;
  if (!user) return null;

  return (
    <>
      <h2>{user.username}</h2>
      <p>
        <b>Email: </b> {user.email}
      </p>
    </>
  );
}
export default User;

import React, { createContext, useReducer, useContext } from "react";
import * as api from "./Api";
import createAsyncActionDispatcher, {
  initialAsyncState,
  createAsyncHandler,
} from "./asyncActionUtils";

const initialState = {
  users: initialAsyncState,
  user: initialAsyncState,
};

const usersHandler = createAsyncHandler("GET_USERS", "users");
const userHandler = createAsyncHandler("GET_USER", "user");

function reducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
    case "GET_USERS_SUCCESS":
    case "GET_USERS_ERROR":
      return usersHandler(state, action);

    case "GET_USER":
    case "GET_USER_SUCCESS":
    case "GET_USER_ERROR":
      return userHandler(state, action);
    default:
      throw new Error("unhaldled actiontype");
  }
}

const UsersStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UsersStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}

export function useUsersState() {
  const state = useContext(UsersStateContext);
  if (!state) {
    throw new Error("Cannot find UserProvier");
  }
  return state;
}

export function useUsersDispatch() {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UserDispatch");
  }
  return dispatch;
}

export const getUsers = createAsyncActionDispatcher("GET_USERS", api.getUsers);
export const getUser = createAsyncActionDispatcher("GET_USER", api.getUser);

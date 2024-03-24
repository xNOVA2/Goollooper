import { User } from "@/types/type";

import { REMOVE_USER, SET_USER } from "./actionTypes";

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

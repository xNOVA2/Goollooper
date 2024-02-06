import { User } from "@/types/type";

import { SET_USER } from "./actionTypes";

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

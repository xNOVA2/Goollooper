import { User } from "@/types/type";

import { REMOVE_USER, SET_USER } from "../actions/actionTypes";

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload?.data,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

export default userReducer;

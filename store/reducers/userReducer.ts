import { User } from "@/types/type";

import { SET_USER } from "../actions/actionTypes";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;

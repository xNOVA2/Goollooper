import { User } from "@/types/type";

import { REMOVE_USER, SET_USER } from "../actions/actionTypes";

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmY0ZTgxMTM4YjFkZmRlZDBkZTZlMmMiLCJyb2xlIjoxLCJpYXQiOjE3MjczMjYyODUsImV4cCI6MTcyNzQxMjY4NX0.N2Mhq2j2HV2C_5c7g5USMrmHOgf0z6bOHo7xsDqTrx0",
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

import { combineReducers } from "redux";

import userReducer from "./userReducer";
import paymentReducer from "../Slices/PaymentSlice";

const rootReducer = combineReducers({
  user: userReducer,
  payment: paymentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

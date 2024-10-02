import { combineReducers } from "redux";

import userReducer from "./userReducer";
import paymentReducer from "../Slices/PaymentSlice";
import serviceReducer from "../Slices/ServiceSlice";

const rootReducer = combineReducers({
  user: userReducer,
  payment: paymentReducer,
  service: serviceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

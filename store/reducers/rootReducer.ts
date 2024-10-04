import { combineReducers } from "redux";

import userReducer from "./userReducer";
import paymentReducer from "../Slices/PaymentSlice";
import serviceReducer from "../Slices/ServiceSlice";
import industryReducer from "../Slices/IndustrySlice";  

const rootReducer = combineReducers({
  user: userReducer,
  payment: paymentReducer,
  service: serviceReducer,
  industry: industryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

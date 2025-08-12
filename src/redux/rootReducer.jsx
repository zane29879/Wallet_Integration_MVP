import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import dashboardReducer from "./dashboard/dashboardReducer";
import checkoutReducer from "./checkout/checkoutReducer";
import walletReducer from "./wallet/walletReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  checkout: checkoutReducer,
  wallet: walletReducer,
});

export default rootReducer;

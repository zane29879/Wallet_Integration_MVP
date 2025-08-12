import {
  FETCH_DASHBOARD_PENDING,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
} from "./dashboardTypes";

const initialState = {
  user: null,
  cryptos: [],
  purchaseHistory: [],
  rewardHistory: [],
  status: "idle",
  error: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_PENDING:
      return { ...state, status: "loading", error: null };
    case FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        user: action.payload.user,
        cryptos: action.payload.cryptos,
        purchaseHistory: action.payload.purchaseHistory,
        rewardHistory: action.payload.rewardHistory,
      };
    case FETCH_DASHBOARD_FAILURE:
      return { ...state, status: "failed", error: action.payload };
    default:
      return state;
  }
};

export default dashboardReducer;

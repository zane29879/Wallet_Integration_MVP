import { LOGIN, LOGOUT, SET_STATUS, SET_USER } from "./types";

const initialState = {
  user: null, // Store user data
  isAuthenticated: false, // Track authentication status
  status: "idle",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload, // Store user info after login
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null, // Clear user info on logout
        isAuthenticated: false,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload, // Manually set user info
        isAuthenticated: true,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

const initialState = {
  address: null,
  balance: null,
  network: null,
};

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_WALLET_INFO":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
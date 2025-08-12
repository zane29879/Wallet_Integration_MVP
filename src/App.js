import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import store from "./redux/store";
import { Provider } from "react-redux";

import { setUser } from "./redux/auth/actions";
const savedUser = localStorage.getItem("authUser");
if (savedUser) {
  store.dispatch(setUser(JSON.parse(savedUser)));
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
    </Provider>
  );
}

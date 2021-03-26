import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./component/Main";
import UserInput from "./component/UserInput";

export default function App() {
  return (
    <Provider store={store}>
      {" "}
      <div>
        <UserInput />
      </div>
    </Provider>
  );
}

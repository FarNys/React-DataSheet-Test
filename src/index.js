import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { applyMiddleware, compose, createStore } from "redux";
import { allReducers } from "./store/store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(allReducers, compose(applyMiddleware(thunk)));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

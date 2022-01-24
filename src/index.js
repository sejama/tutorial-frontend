import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import setupInterceptors from "./services/setupInterceptors";
import "./index.css";
//import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  /*<BrowserRouter store={store}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")*/
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

setupInterceptors(store);
serviceWorker.unregister();
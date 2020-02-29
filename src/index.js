import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import App from "./components/App";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);
store.subscribe(
  throttle(() => {
    saveState({
      team: store.getState().team
    });
  }, 1000)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

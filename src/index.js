import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./polyfills/endsWith";
import "./polyfills/performance";
import "./utils/visibility";
import "./index.css";
import Root from "./Components/Root";
import configureStore from "./configureStore";

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
registerServiceWorker();

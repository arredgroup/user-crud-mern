import React from "react";
import ReactDOM from "react-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

serviceWorker.unregister();

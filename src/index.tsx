import {BrowserRouter} from "react-router-dom";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>
);

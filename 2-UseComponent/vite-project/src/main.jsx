import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import App from './App.jsx'

// const container = document.querySelector('#app')
// const root = createRoot(container)
// root.render(<App />)

createRoot(document.querySelector('#app')).render(
    <StrictMode>
        <App/>
    </StrictMode>
)
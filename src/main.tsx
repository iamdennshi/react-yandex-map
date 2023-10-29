import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { YMaps } from "@pbe/react-yandex-maps";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <YMaps query={{ apikey: import.meta.env.VITE_API_KEY }}>
      <div className="relative overflow-hidden">
        <App />
      </div>
    </YMaps>
  </React.StrictMode>,
);

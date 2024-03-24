import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PoluiProvider } from "pol-ui";

ReactDOM.createRoot(document.getElementById("root")).render(
    <NextUIProvider>
      <PoluiProvider
        theme={{ theme: { breadcrumb: { root: { base: "py-6" } } } }}
      >
        <App />
      </PoluiProvider>
    </NextUIProvider>

);

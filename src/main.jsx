import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { VendorsContextProvider } from "./context/VendorsContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <VendorsContextProvider>
        <App />
      </VendorsContextProvider>
    </AuthContextProvider>
  </StrictMode>
);

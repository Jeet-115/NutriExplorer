import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProductProvider } from "./context/ProductContext";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </ThemeProvider>
  </StrictMode>
);

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.css";
import AuthProvider from "./provider/AuthProvider/AuthProvider";
import { router } from "./routes/index";

createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
      <ToastContainer />
    </AuthProvider>
  </>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import AuthProvider from "./context/Authprovider";

import {QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer/>
    </QueryClientProvider>
  </AuthProvider>
);

import React from "react";
import { Link } from "./components/Link/Link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center my-4">Linker.io</h1>
      <Link />
      <ToastContainer />
    </div>
  );
}

export default App;

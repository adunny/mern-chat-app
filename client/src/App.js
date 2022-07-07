import React from "react";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { SocketProvider } from "./context/SocketProvider";

function App() {
  return (
    <SocketProvider>
      <Home />
    </SocketProvider>
  );
}

export default App;

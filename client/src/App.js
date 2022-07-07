import React from "react";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { SocketProvider, socket } from "./context/SocketProvider";

function App() {
  return (
    <SocketProvider value={socket}>
      <Home />
    </SocketProvider>
  );
}

export default App;

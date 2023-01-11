import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Board from "./components/Board";

function App() {
  return (
    <div className="h-screen bg-kanban-light-grey-bg">
      <Board />
    </div>
  );
}

export default App;

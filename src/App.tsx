import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Board from "./components/Board";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-min bg-kanban-light-grey-bg">
      <Board />
    </div>
  );
}

export default App;

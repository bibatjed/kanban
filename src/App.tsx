import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Board from "./components/Board";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen">
      <Board />
    </div>
  );
}

export default App;

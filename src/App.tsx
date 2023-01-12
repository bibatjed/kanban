import Board from "./components/Board";
import ColumnModal from "./components/ColumnModal";

function App() {
  return (
    <div className="h-screen bg-kanban-light-grey-bg">
      <Board />
      <ColumnModal />
    </div>
  );
}

export default App;

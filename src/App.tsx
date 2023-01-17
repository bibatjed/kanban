import Board from "./components/Board";
import ColumnModal from "./components/ColumnModal";
import Header from "./components/Header";
import TaskModal from "./components/TaskModal";

function App() {
  return (
    <div className="h-screen overflow-y-hidden bg-kanban-light-grey-bg">
      <Header />
      <Board />
      <ColumnModal />
      <TaskModal />
    </div>
  );
}

export default App;

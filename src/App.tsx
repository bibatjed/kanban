import Board from "./components/Board";
import ColumnModal from "./components/ColumnModal";
import Header from "./components/Header";
import TaskModal from "./components/TaskModal";
import DeleteTaskModal from "./components/TaskModal/DeleteTaskModal";
import ViewTaskModal from "./components/TaskModal/ViewTaskModal";

function App() {
  return (
    <div className="h-screen overflow-y-hidden bg-kanban-light-grey-bg">
      <Header />
      <Board />
      <ColumnModal />
      <TaskModal />
      <ViewTaskModal />
      <DeleteTaskModal />
    </div>
  );
}

export default App;

import Board from "./components/Board";
import ColumnModal from "./components/ColumnModal";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CreateTaskModal from "./components/TaskModal/CreateTaskModal";
import DeleteTaskModal from "./components/TaskModal/DeleteTaskModal";
import EditTaskModal from "./components/TaskModal/EditTaskModal";
import ViewTaskModal from "./components/TaskModal/ViewTaskModal";

function App() {
  return (
    <div className="h-screen bg-kanban-light-grey-bg">
      <Header />
      <Sidebar />
      <Board />
      <ColumnModal />
      <CreateTaskModal />
      <ViewTaskModal />
      <EditTaskModal />
      <DeleteTaskModal />
    </div>
  );
}

export default App;

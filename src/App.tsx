import Board from './components/Board';
import AddColumModal from './components/BoardModal/AddColumnModal';
import CreateBoardModal from './components/BoardModal/CreateBoardModal';
import DeleteBoardModal from './components/BoardModal/DeleteBoardModal';
import EditBoardModal from './components/BoardModal/EditBoardModal';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CreateTaskModal from './components/TaskModal/CreateTaskModal';
import DeleteTaskModal from './components/TaskModal/DeleteTaskModal';
import EditTaskModal from './components/TaskModal/EditTaskModal';
import ViewTaskModal from './components/TaskModal/ViewTaskModal';

function App() {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <Sidebar />
      <Board />
      <AddColumModal />
      <CreateBoardModal />
      <EditBoardModal />
      <DeleteBoardModal />
      <CreateTaskModal />
      <ViewTaskModal />
      <EditTaskModal />
      <DeleteTaskModal />
    </div>
  );
}

export default App;

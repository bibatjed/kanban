import { useMediaQuery } from 'react-responsive';
import Board from './components/Board';
import AddColumModal from './components/BoardModal/AddColumnModal';
import CreateBoardModal from './components/BoardModal/CreateBoardModal';
import DeleteBoardModal from './components/BoardModal/DeleteBoardModal';
import EditBoardModal from './components/BoardModal/EditBoardModal';
import Header from './components/Header';
import MenuMobile from './components/MenuMobile';
import Sidebar from './components/Sidebar';
import CreateTaskModal from './components/TaskModal/CreateTaskModal';
import DeleteTaskModal from './components/TaskModal/DeleteTaskModal';
import EditTaskModal from './components/TaskModal/EditTaskModal';
import ViewTaskModal from './components/TaskModal/ViewTaskModal';

//TODO: create layout or views to clean up app component
function App() {
  const isMobile = useMediaQuery({
    query: '(max-width: 764px)',
  });
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      {isMobile && <MenuMobile />}
      {!isMobile && <Sidebar />}
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

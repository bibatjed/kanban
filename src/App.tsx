import { useMediaQuery } from 'react-responsive';
import Board from './components/Board';
import Header from './components/Header';
import MenuMobile from './components/MenuMobile';
import Modal from './components/Modals';
import Sidebar from './components/Sidebar';

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
      <Modal />
    </div>
  );
}

export default App;

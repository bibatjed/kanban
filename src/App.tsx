import Board from "./components/Board";
import ColumnModal from "./components/ColumnModal";
import Header from "./components/Header";

function App() {
  return (
    <div className="h-screen overflow-y-hidden bg-kanban-light-grey-bg">
      <Header />
      <Board />
      <ColumnModal />
    </div>
  );
}

export default App;

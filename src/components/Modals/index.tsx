import { modal } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import ViewTaskModal from './ViewTaskModal';
import EditTaskModal from './EditTaskModal';
import CreateTaskModal from './CreateTaskModal';
import DeleteTaskModal from './DeleteTaskModal';
import CreateBoardModal from './CreateBoardModal';
import EditBoardModal from './EditBoardModal';
import DeleteBoardModal from './DeleteBoardModal';

const {
  VIEW_TASK,
  EDIT_TASK,
  DELETE_TASK,
  ADD_TASK,
  CREATE_BOARD,
  ADD_COLUMN,
  DELETE_BOARD,
  EDIT_BOARD,
} = modal;

//Do conditional rendering to avoid unecessary rerenders specially when modal is not displayed
export default function Modal() {
  const modal = useAppSelector((state) => state.modalReducers);
  return (
    <>
      {/* Task Modals */}
      {modal.mountModal && modal.modalType === ADD_TASK && <CreateTaskModal />}
      {modal.mountModal && modal.modalType === VIEW_TASK && <ViewTaskModal />}
      {modal.mountModal && modal.modalType === EDIT_TASK && <EditTaskModal />}
      {modal.mountModal && modal.modalType === DELETE_TASK && (
        <DeleteTaskModal />
      )}

      {/* BoardModals */}

      {modal.mountModal && modal.modalType === CREATE_BOARD && (
        <CreateBoardModal />
      )}
      {modal.mountModal &&
        [EDIT_BOARD, ADD_COLUMN].includes(modal.modalType) && (
          <EditBoardModal />
        )}
      {modal.mountModal && modal.modalType === DELETE_BOARD && (
        <DeleteBoardModal />
      )}
    </>
  );
}

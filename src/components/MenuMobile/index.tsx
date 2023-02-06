import MoonIcon from '../../assets/icon-dark-theme.svg';
import SunIcon from '../../assets/icon-light-theme.svg';
import { Dialog, Transition } from '@headlessui/react';
import Switch from '../Switch';
import { Fragment } from 'react';
import IconAddTaskMobile from '../../assets/icons/IconAddTaskMobile';
import IconBoard from '../../assets/icons/IconBoard';
import { openModal } from '../../reducer/modal';
import useTheme from '../../hooks/useTheme';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addDetails } from '../../reducer/boardDetails';
import { modal } from '../../constants';
import { closeSidebar } from '../../reducer/sidebar';

const { CREATE_BOARD } = modal;
export default function MenuMobile() {
  const { handleChangeTheme, theme } = useTheme();
  const isOpen = useAppSelector((state) => state.sidebarReducers.isOpen);
  const currentSelected = useAppSelector(
    (state) => state.boardDetailsReducers.boardSelectedIndex
  );
  const state = useAppSelector((state) => state.boardReducers);
  const boardNames = state.map((item) => item.name);
  const dispatch = useAppDispatch();

  function handleOnClick(index: number) {
    return function () {
      dispatch(addDetails({ type: '', boardSelectedIndex: index }));
      dispatch(closeSidebar());
    };
  }

  return (
    <>
      <Transition unmount={true} show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch(closeSidebar())}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto overflow-x-hidden">
            <div className="relative top-20 left-[2vw] min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:bg-kanban-dark-grey">
                  <div className="flex flex-col gap-3 pr-3 pt-6">
                    <span className="pl-8 pb-2 font-plus-jakarta-sans text-[13px] font-medium uppercase tracking-widest text-kanban-medium-grey">
                      All boards ({boardNames.length})
                    </span>
                    {boardNames.map((board, index) => {
                      const active = index === currentSelected;
                      return (
                        <button
                          key={index}
                          onClick={handleOnClick(index)}
                          className={`${
                            active
                              ? 'bg-kanban-main-purple'
                              : 'hover:bg-kanban-main-purple-hover'
                          } group flex flex-row items-center gap-5 rounded-r-full p-3 pl-8 transition-all duration-100`}
                        >
                          <IconBoard
                            className={`${
                              active
                                ? 'fill-kanban-white'
                                : 'fill-kanban-medium-grey group-hover:fill-kanban-white'
                            } transition-all duration-100`}
                          />
                          <span
                            className={`${
                              active
                                ? 'text-kanban-white'
                                : 'text-kanban-medium-grey'
                            } font-plus-jakarta-sans text-sm font-semibold transition-all duration-100 group-hover:text-kanban-white`}
                          >
                            {board}
                          </span>
                        </button>
                      );
                    })}
                    <button
                      onClick={() => {
                        dispatch(openModal({ type: CREATE_BOARD }));
                        dispatch(closeSidebar());
                      }}
                      className="group mt-3 flex flex-row items-center gap-5 pl-8"
                    >
                      <IconBoard className="fill-kanban-main-purple group-hover:fill-kanban-main-purple-hover" />
                      <span className="flex flex-row items-center gap-1 font-plus-jakarta-sans text-sm font-semibold text-kanban-main-purple group-hover:text-kanban-main-purple-hover">
                        <IconAddTaskMobile className="fill-kanban-main-purple group-hover:fill-kanban-main-purple-hover" />
                        Create New Board
                      </span>
                    </button>
                  </div>
                  <div className="px-7 pt-5 pb-5">
                    <div className="dark flex flex-row items-center justify-center gap-5 rounded-lg bg-kanban-lines-light bg-opacity-60 p-3 transition-all duration-150 ease-in dark:bg-kanban-very-dark-gray">
                      <img
                        src={MoonIcon}
                        className="aspect-square w-4"
                        alt="moon"
                      />
                      <Switch value={theme} onChange={handleChangeTheme} />
                      <img
                        src={SunIcon}
                        className="aspect-square w-4"
                        alt="sun"
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

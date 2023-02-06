import MoonIcon from '../../assets/icon-dark-theme.svg';
import SunIcon from '../../assets/icon-light-theme.svg';
import IconAddTaskMobile from '../../assets/icons/IconAddTaskMobile';
import Switch from '../Switch';
import IconBoard from '../../assets/icons/IconBoard';
import IconEye from '../../assets/icons/IconEye';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeSidebar } from '../../reducer/sidebar';
import { addDetails } from '../../reducer/boardDetails';
import { openModal } from '../../reducer/modal';
import { modal } from '../../constants';
import useTheme from '../../hooks/useTheme';

const { CREATE_BOARD } = modal;
export default function Sidebar() {
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
    };
  }

  return (
    <div
      className={`${
        isOpen ? '' : '-translate-x-full'
      } fixed z-10 flex h-[calc(100%-5.7rem)] w-full max-w-[18.06rem] flex-col justify-between border-r-[1px] border-kanban-lines-light bg-kanban-white pt-8 pb-3 transition-all duration-200 dark:border-r-kanban-lines-dark dark:bg-kanban-dark-grey`}
    >
      <div className="flex flex-col gap-2 pr-10">
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
                  active ? 'text-kanban-white' : 'text-kanban-medium-grey'
                } font-plus-jakarta-sans text-sm font-semibold transition-all duration-100 group-hover:text-kanban-white`}
              >
                {board}
              </span>
            </button>
          );
        })}
        <button
          onClick={() => dispatch(openModal({ type: CREATE_BOARD }))}
          className="group mt-3 flex flex-row items-center gap-5 pl-8"
        >
          <IconBoard className="fill-kanban-main-purple group-hover:fill-kanban-main-purple-hover" />
          <span className="flex flex-row items-center gap-1 font-plus-jakarta-sans text-sm font-semibold text-kanban-main-purple group-hover:text-kanban-main-purple-hover">
            <IconAddTaskMobile className="fill-kanban-main-purple group-hover:fill-kanban-main-purple-hover" />
            Create New Board
          </span>
        </button>
      </div>
      <div className="mb-10 flex flex-col gap-3 px-7">
        <div className="dark flex flex-row items-center justify-center gap-5 rounded-lg bg-kanban-lines-light bg-opacity-60 p-3 transition-all duration-150 ease-in dark:bg-kanban-very-dark-gray">
          <img src={MoonIcon} className="aspect-square w-4" alt="moon" />
          <Switch value={theme} onChange={handleChangeTheme} />
          <img src={SunIcon} className="aspect-square w-4" alt="sun" />
        </div>
        <button
          onClick={() => dispatch(closeSidebar())}
          className="group flex flex-row items-center gap-2 pl-2"
        >
          <IconEye className="fill-kanban-medium-grey group-hover:opacity-60" />
          <span className="font-plus-jakarta-sans text-[13px] font-semibold text-kanban-medium-grey group-hover:opacity-60">
            Hide Sidebar
          </span>
        </button>
      </div>
    </div>
  );
}

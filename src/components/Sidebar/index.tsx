import MoonIcon from "../../assets/icon-dark-theme.svg";
import SunIcon from "../../assets/icon-light-theme.svg";
import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import Switch from "../Switch";
import IconBoard from "../../assets/icons/IconBoard";
import IconEye from "../../assets/icons/IconEye";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closeSidebar } from "../../reducer/sidebar";
import { addDetails } from "../../reducer/boardDetails";
import { openModal } from "../../reducer/modal";
import { modal } from "../../constants";
import useTheme from "../TaskModal/hooks/useTheme";

const { CREATE_BOARD } = modal;
export default function Sidebar() {
  const { handleChangeTheme, theme } = useTheme();
  const isOpen = useAppSelector((state) => state.sidebarReducers.isOpen);
  const currentSelected = useAppSelector(
    (state) => state.boardDetailsReducers.boardSelectedIndex
  );
  const state = useAppSelector((state) => state.containerReducers);
  const boardNames = state.map((item) => item.name);
  const dispatch = useAppDispatch();

  function handleOnClick(index: number) {
    return function () {
      dispatch(addDetails({ type: "", boardSelectedIndex: index }));
    };
  }

  return (
    <div
      className={`${
        isOpen ? "" : "-translate-x-full"
      } transition-all duration-200 flex flex-col justify-between bg-kanban-white fixed h-[calc(100%-5.7rem)] pt-8 pb-3 w-full max-w-[18.13rem] border-r-[1px] border-kanban-lines-light z-10`}
    >
      <div className="pr-10 flex flex-col gap-2">
        <span className="pl-8 pb-2 font-plus-jakarta-sans uppercase text-[13px] font-medium tracking-widest text-kanban-medium-grey">
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
                  ? "bg-kanban-main-purple"
                  : "hover:bg-kanban-main-purple-hover"
              } pl-8 p-3 flex flex-row gap-5 items-center group transition-all duration-100 rounded-r-full`}
            >
              <IconBoard
                className={`${
                  active
                    ? "fill-kanban-white"
                    : "fill-kanban-medium-grey group-hover:fill-kanban-white"
                } transition-all duration-100`}
              />
              <span
                className={`${
                  active ? "text-kanban-white" : "text-kanban-medium-grey"
                } font-plus-jakarta-sans group-hover:text-kanban-white transition-all duration-100 font-semibold text-sm`}
              >
                {board}
              </span>
            </button>
          );
        })}
        <button
          onClick={() => dispatch(openModal({ type: CREATE_BOARD }))}
          className="pl-8 mt-3 flex flex-row items-center gap-5 group"
        >
          <IconBoard className="fill-kanban-main-purple group-hover:fill-kanban-main-purple-hover" />
          <span className="flex flex-row items-center gap-1 group-hover:text-kanban-main-purple-hover font-plus-jakarta-sans text-sm font-semibold text-kanban-main-purple">
            <IconAddTaskMobile className="fill-kanban-main-purple group-hover:fill-kanban-main-purple-hover" />
            Create New Board
          </span>
        </button>
      </div>
      <div className="px-7 flex flex-col gap-3">
        <div className="flex flex-row bg-opacity-60 items-center justify-center gap-5 p-3 bg-kanban-lines-light rounded-lg">
          <img src={MoonIcon} className="w-4 aspect-square" alt="moon" />
          <Switch value={theme} onChange={handleChangeTheme} />
          <img src={SunIcon} className="w-4 aspect-square" alt="sun" />
        </div>
        <button
          onClick={() => dispatch(closeSidebar())}
          className="flex flex-row items-center gap-2 group pl-2"
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

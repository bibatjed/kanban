import MoonIcon from "../../assets/icon-dark-theme.svg";
import SunIcon from "../../assets/icon-light-theme.svg";
import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import Switch from "../Switch";
import IconBoard from "../../assets/icons/IconBoard";
import IconEye from "../../assets/icons/IconEye";
export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between bg-kanban-white fixed h-[calc(100%-6rem)] pt-2 pb-3 w-full max-w-[18.13rem] border-r-[1px] border-kanban-lines-light">
      <div className="pr-10 flex flex-col gap-2.5">
        <span className="pl-8 font-plus-jakarta-sans uppercase text-[13px] font-medium tracking-widest text-kanban-medium-grey">
          All boards (1)
        </span>
        <div className="pl-8 p-2 flex flex-row gap-5 items-center group hover:bg-kanban-main-purple-hover rounded-r-full">
          <IconBoard className="fill-kanban-medium-grey group-hover:fill-kanban-white" />
          <span className="font-plus-jakarta-sans group-hover:text-kanban-white font-semibold text-kanban-medium-gray text-sm text-kanban-medium-grey">
            SomeBoard
          </span>
        </div>
        <div className="pl-8 flex flex-row items-center gap-5 group">
          <IconBoard className="fill-kanban-main-purple group-hover:fill-kanban-main-purple-hover" />
          <span className="flex flex-row items-center gap-1 group-hover:text-kanban-main-purple-hover font-plus-jakarta-sans text-sm font-semibold text-kanban-main-purple">
            <IconAddTaskMobile className="fill-kanban-main-purple group-hover:fill-kanban-main-purple-hover" />
            Create New Board
          </span>
        </div>
      </div>
      <div className="px-7 flex flex-col gap-3">
        <div className="flex flex-row bg-opacity-60 items-center justify-center gap-5 p-3 bg-kanban-lines-light rounded-lg">
          <img src={MoonIcon} className="w-4 aspect-square" alt="moon" />
          <Switch />
          <img src={SunIcon} className="w-4 aspect-square" alt="sun" />
        </div>
        <div className="flex flex-row items-center gap-2 group pl-2">
          <IconEye className="fill-kanban-medium-grey group-hover:opacity-60" />
          <span className="font-plus-jakarta-sans text-[13px] font-semibold text-kanban-medium-grey group-hover:opacity-60">
            Hide Sidebar
          </span>
        </div>
      </div>
    </div>
  );
}

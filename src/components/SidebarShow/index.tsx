import IconEyeShow from "../../assets/icons/IconEyeShow";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { openSidebar } from "../../reducer/sidebar";

export default function SideBarShow() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sidebarReducers.isOpen);
  return (
    <div
      className={`${
        isOpen ? "-translate-x-full" : ""
      } transition-all duration-100 ease-in fixed bottom-20 left-0 group`}
    >
      <button
        onClick={() => dispatch(openSidebar())}
        className="bg-kanban-main-purple group-hover:bg-kanban-main-purple-hover p-4 pl-5 rounded-r-full"
      >
        <IconEyeShow className="fill-kanban-white group-hover:opacity-60" />
      </button>
    </div>
  );
}

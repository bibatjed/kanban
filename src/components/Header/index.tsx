import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import LogoDark from "../../assets/logo-dark.svg";
import { useAppDispatch } from "../../hooks/redux";
import { openModal } from "../../reducer/modal";
import Button from "../Button/Button";
import MyDropdown from "../Dropdown";
import { modal } from "../../constants";
const { ADD_TASK } = modal;
export default function Header() {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full gap-10 flex bg-kanban-white">
      <div className="border p-8 pr-28 border-kanban-lines-light">
        <div className="w-36">
          <img className="w-full" src={LogoDark} />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between">
        <span className="font-plus-jakarta-sans text-2xl font-extrabold">
          Platform Launch
        </span>
        <div className="flex flex-row items-center gap-7 mr-9">
          <div className="w-40">
            <Button
              variant="primary"
              onClick={() => dispatch(openModal({ type: ADD_TASK }))}
              text="Add New Task"
            >
              <IconAddTaskMobile className="fill-kanban-white" />
            </Button>
          </div>
          {/* TODO Implement function */}
          {/* <MyDropdown /> */}
        </div>
      </div>
    </div>
  );
}

import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import LogoDark from "../../assets/logo-dark.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { openModal } from "../../reducer/modal";
import Button from "../Button/Button";
import DropDown from "../Dropdown";
import { modal } from "../../constants";
import { useMemo } from "react";
const { EDIT_BOARD, DELETE_BOARD, ADD_TASK } = modal;
export default function Header() {
  const dispatch = useAppDispatch();
  const boardDetails = useAppSelector((state) => state.boardDetailsReducers);
  const state = useAppSelector((state) => state.containerReducers);
  const boardName = state[boardDetails.boardSelectedIndex]?.name ?? "";
  const MenuList = useMemo(
    () => [
      {
        text: "Edit Board",
        onClick: () => dispatch(openModal({ type: EDIT_BOARD })),
        colorPallete: ["text-gray-400", "text-kanban-medium-grey"],
      },
      {
        text: "Delete Board",
        onClick: () =>
          dispatch(
            openModal({
              type: DELETE_BOARD,
            })
          ),
        colorPallete: ["text-kanban-red-hover", "text-kanban-red"],
      },
    ],
    [dispatch]
  );
  return (
    <div className="w-full gap-10 flex bg-kanban-white">
      <div className="border p-8 pr-28 border-kanban-lines-light">
        <div className="w-36">
          <img className="w-full" src={LogoDark} />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between">
        <span className="font-plus-jakarta-sans text-2xl font-extrabold">
          {boardName}
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
          <DropDown menuItem={MenuList} />
        </div>
      </div>
    </div>
  );
}

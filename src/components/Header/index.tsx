import IconAddTaskMobile from '../../assets/icons/IconAddTaskMobile';
import LogoDark from '../../assets/logo-dark.svg';
import LogoLight from '../../assets/logo-light.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { openModal } from '../../reducer/modal';
import Button from '../Button/Button';
import DropDown from '../Dropdown';
import { modal, theme } from '../../constants';
import { useMemo } from 'react';
import useTheme from '../TaskModal/hooks/useTheme';
const { EDIT_BOARD, DELETE_BOARD, ADD_TASK } = modal;
const { DARK } = theme;
export default function Header() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const boardDetails = useAppSelector((state) => state.boardDetailsReducers);
  const state = useAppSelector((state) => state.boardReducers);
  const boardName = state[boardDetails.boardSelectedIndex]?.name ?? '';
  const MenuList = useMemo(
    () => [
      {
        text: 'Edit Board',
        onClick: () => dispatch(openModal({ type: EDIT_BOARD })),
        colorPallete: ['text-gray-400', 'text-kanban-medium-grey'],
      },
      {
        text: 'Delete Board',
        onClick: () =>
          dispatch(
            openModal({
              type: DELETE_BOARD,
            })
          ),
        colorPallete: ['text-kanban-red-hover', 'text-kanban-red'],
      },
    ],
    [dispatch]
  );
  return (
    <div className="flex w-full gap-10 border-b-[1px] border-b-kanban-lines-light bg-kanban-white transition-all duration-150 ease-in  dark:border-b-kanban-lines-dark dark:bg-kanban-dark-grey">
      <div className="border-r-[1px] border-kanban-lines-light p-8 pr-28 transition-all duration-150 ease-in dark:border-kanban-lines-dark">
        <div className="w-36">
          <img
            className={`${
              theme === DARK ? 'hidden opacity-0' : 'opacity-100'
            } w-full transition-all duration-150 ease-in`}
            src={LogoDark}
          />
          <img
            className={` ${
              theme === DARK ? 'opacity-100' : 'hidden opacity-0'
            } w-full transition-all duration-150 ease-in`}
            src={LogoLight}
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between">
        <span className="font-plus-jakarta-sans text-2xl font-extrabold transition-all duration-150 ease-in dark:text-kanban-white">
          {boardName}
        </span>
        <div className="mr-9 flex flex-row items-center gap-7">
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

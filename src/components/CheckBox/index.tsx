import IconCheck from "../../assets/icon-check.svg";

type CheckBoxProps = {
  text: string;
  value: boolean;
};

interface ICheckBox extends CheckBoxProps {
  onClick: () => void;
}
export default function CheckBox(props: ICheckBox) {
  return (
    <div
      onClick={props.onClick}
      className="flex items-center px-3 py-2 gap-3 rounded-md w-full cursor-pointer select-none dark:bg-kanban-very-dark-gray bg-kanban-lines-light"
    >
      <div
        className={`${
          props.value ? "bg-kanban-main-purple" : "bg-kanban-white"
        } p-[1px] w-5 h-5  flex justify-center items-center transition-all ease-in duration-100`}
      >
        <div className="flex w-[10px] h-[10px] items-center justify-center">
          <img
            className={`${
              props.value ? "scale-1" : "scale-0"
            } w-full h-full transition-all ease-in duration-100`}
            src={IconCheck}
          />
        </div>
      </div>
      <p
        className={`${
          props.value
            ? "line-through text-gray-600"
            : "text-kanban-black dark:text-kanban-white"
        } text-[13px] font-plus-jakarta-sans transition-all duration-100 ease-in`}
      >
        {props.text}
      </p>
    </div>
  );
}

import { ChangeEvent } from "react";

type InputProps = {
  isReadOnly: boolean;
  placeholder: string;
  value: string;
  name: string;
};

interface IProps extends InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function Input(props: Partial<IProps>) {
  const { placeholder = "e.g Web Design", isReadOnly = false } = props || {};
  return (
    <div className="group w-full">
      <div className="border-2 w-full group-focus-within:border-kanban-main-purple-hover border-kanban-lines-light rounded-md">
        <input
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={placeholder}
          readOnly={isReadOnly}
          className="w-full  read-only:pointer-events-none outline-none p-2 rounded-md font-plus-jakarta-sans placeholder-inherit text-sm placeholder-gray-400"
        />
      </div>
    </div>
  );
}

import { ChangeEvent } from 'react';

type InputProps = {
  isReadOnly: boolean;
  placeholder: string;
  value: string;
  name?: string;
  dataId?: number;
  error?: string;
};

interface IProps extends InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function Input(props: Partial<IProps>) {
  const {
    placeholder = 'e.g Web Design',
    isReadOnly = false,
    name,
    value,
    dataId,
    onChange,
    error,
  } = props || {};

  return (
    <div className="group w-full">
      <div
        className={`${
          isReadOnly && 'opacity-30'
        } relative w-full rounded-md border-2 border-kanban-lines-light group-focus-within:border-kanban-main-purple-hover dark:border-kanban-lines-dark`}
      >
        <input
          name={name}
          value={value}
          data-id={dataId}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={isReadOnly}
          className={`w-full rounded-md p-2 pl-4 font-plus-jakarta-sans text-sm placeholder-inherit  placeholder-gray-400 outline-none read-only:pointer-events-none dark:bg-kanban-dark-grey dark:text-kanban-white`}
        />
        <label className="absolute right-2 -bottom-0 font-plus-jakarta-sans text-xs font-semibold capitalize text-kanban-red">
          {error}
        </label>
      </div>
    </div>
  );
}

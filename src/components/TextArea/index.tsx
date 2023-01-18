import { ChangeEvent } from "react";

type TextArea = {
  value: string;
};
interface ITextAreaProps extends TextArea {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function TextArea(props: ITextAreaProps) {
  return (
    <div className="group w-full">
      <div className="w-full border-2 border-kanban-lines-light rounded-md group-focus-within:border-kanban-main-purple-hover">
        <textarea
          onChange={props.onChange}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          className="w-full p-4 rounded-md font-plus-jakarta-sans h-full placeholder-inherit text-sm outline-none resize-none placeholder-gray-400"
        />
      </div>
    </div>
  );
}
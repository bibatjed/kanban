import { ReactNode } from "react";

type ButtonProps = {
  text: string;
  children?: ReactNode | ReactNode[];
  variant: "primary" | "secondary";
};

interface IButton extends ButtonProps {
  onClick: () => void;
}
const colorSchemeOptions: Record<string, string> = {
  primary: "bg-kanban-main-purple text-kanban-white",
  secondary: "bg-kanban-lines-light text-kanban-main-purle",
};
export default function Button(props: IButton) {
  return (
    <button
      onClick={props.onClick}
      className={` p-2 text-sm w-full rounded-xl flex
      flex-row items-center justify-center font-plus-jakarta-sans
       gap-1 ${colorSchemeOptions[props.variant]}`}
    >
      {props.children} {props.text}
    </button>
  );
}

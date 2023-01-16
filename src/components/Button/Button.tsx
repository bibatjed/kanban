import { ReactNode } from "react";

type ButtonProps = {
  text: string;
  children?: ReactNode | ReactNode[];
  variant: "primary" | "secondary" | "none";
  disabled?: boolean;
};

interface IButton extends ButtonProps {
  onClick: () => void;
}
const colorSchemeOptions: Record<string, string> = {
  primary: "bg-kanban-main-purple text-kanban-white",
  secondary: "bg-kanban-lines-light text-kanban-main-purle",
  none: "",
};
export default function jButton(props: IButton) {
  const { disabled = false } = props;
  return (
    <button
      onClick={props.onClick}
      disabled={disabled}
      className={` p-2 text-sm w-full rounded-xl flex
      flex-row items-center justify-center font-plus-jakarta-sans
       gap-1 ${colorSchemeOptions[props.variant]}`}
    >
      {props.children} {props.text}
    </button>
  );
}

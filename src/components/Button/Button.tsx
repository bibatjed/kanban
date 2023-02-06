import { ReactNode } from 'react';

type ButtonProps = {
  text?: string;
  children?: ReactNode | ReactNode[];
  variant: 'primary' | 'secondary' | 'tertiary' | 'none';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

interface IButton extends ButtonProps {
  onClick?: () => void;
}
const colorSchemeOptions: Record<string, string> = {
  primary:
    'bg-kanban-main-purple text-kanban-white hover:bg-kanban-main-purple-hover',
  secondary: 'bg-kanban-lines-light text-kanban-main-purple',
  tertiary: 'bg-kanban-red text-kanban-white',
  none: '',
};
export default function Button(props: IButton) {
  const { disabled = false } = props;
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={disabled}
      className={`${
        disabled ? 'opacity-50' : 'opacity-100'
      } flex h-full w-full flex-row items-center justify-center
      gap-1 rounded-2xl p-3 font-plus-jakarta-sans
       text-sm transition-all duration-150 ease-in ${
         colorSchemeOptions[props.variant]
       }`}
    >
      {props.children} {props.text}
    </button>
  );
}

import { Switch as HSwitch } from "@headlessui/react";
import { theme } from "../../constants";

const { LIGHT } = theme;

type SwitchProps = {
  value: string;
  onChange: () => void;
};
export default function Switch(props: SwitchProps) {
  const enabled = props.value === LIGHT;

  return (
    <HSwitch
      checked={enabled}
      onChange={props.onChange}
      className={`${
        props.value === LIGHT
          ? "bg-kanban-main-purple"
          : "bg-kanban-main-purple opacity-95"
      }
          relative inline-flex items-center h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${
          props.value === LIGHT ? "translate-x-5" : "translate-x-0.5"
        }
            pointer-events-none inline-block aspect-square w-3.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </HSwitch>
  );
}

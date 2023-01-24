import { useState } from "react";
import { Switch as HSwitch } from "@headlessui/react";

export default function Switch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <HSwitch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? "bg-kanban-main-purple" : "bg-kanban-main-purple opacity-95"
      }
          relative inline-flex items-center h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-5" : "translate-x-0.5"}
            pointer-events-none inline-block aspect-square w-3.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </HSwitch>
  );
}

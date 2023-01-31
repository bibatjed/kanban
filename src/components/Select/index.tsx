import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import IconChevronDown from "../../assets/icon-chevron-down.svg";

type SelectProps = {
  list: string[];
  value: string;
  name: string;
};

interface ISelect extends SelectProps {
  onChange: (value: string) => void;
}

export default function Select(props: ISelect) {
  return (
    <div className="group">
      <Listbox name={props.name} value={props.value} onChange={props.onChange}>
        {({ open }) => (
          <>
            <div className="mt-1 relative border-2 dark:border-kanban-lines-dark group-focus-within:border-kanban-main-purple-hover rounded-md ">
              <Listbox.Button className="relative font-plus-jakarta-sans w-full cursor-default rounded-lg dark:bg-kanban-dark-grey bg-white py-2 pl-5 pr-10 text-left shadow-md sm:text-sm">
                <span className="block dark:text-kanban-white capitalize truncate">
                  {props.value}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <img
                    className={`${open ? "rotate-180" : ""} transition-all`}
                    src={IconChevronDown}
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 overflow-y-auto  w-full rounded-md dark:bg-kanban-very-dark-gray bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {props.list.map((item, itemIdx) => (
                    <Listbox.Option
                      key={itemIdx}
                      className={`relative cursor-pointer select-none py-2 pl-5 text-kanban-medium-grey dark:hover:text-kanban-white hover:text-kanban-black `}
                      value={item}
                    >
                      <span
                        className={`truncate font-plus-jakarta-sans capitalize `}
                      >
                        {item}
                      </span>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

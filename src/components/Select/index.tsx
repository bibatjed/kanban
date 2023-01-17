import { ChangeEvent, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import IconChevronDown from "../../assets/icon-chevron-down.svg";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
];

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
            <div className="mt-1 relative border-2 group-focus-within:border-kanban-main-purple-hover rounded-md ">
              <Listbox.Button className="relative font-plus-jakarta-sans w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
                <span className="block capitalize truncate">{props.value}</span>
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
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 overflow-y-scroll  w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {props.list.map((item, itemIdx) => (
                    <Listbox.Option
                      key={itemIdx}
                      className={`relative cursor-pointer select-none py-2 pl-5 text-kanban-medium-grey hover:text-kanban-black `}
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

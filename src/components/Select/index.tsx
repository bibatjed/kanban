import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import IconChevronDown from '../../assets/icon-chevron-down.svg';

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
            <div className="relative mt-1 rounded-md border-2 group-focus-within:border-kanban-main-purple-hover dark:border-kanban-lines-dark ">
              <Listbox.Button className="sm:text-sm relative w-full cursor-default rounded-lg bg-white py-2 pl-5 pr-10 text-left font-plus-jakarta-sans shadow-md dark:bg-kanban-dark-grey">
                <span className="block truncate capitalize dark:text-kanban-white">
                  {props.value}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <img
                    className={`${open ? 'rotate-180' : ''} transition-all`}
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
                <Listbox.Options className="sm:text-sm absolute z-50 mt-1 max-h-60  w-full overflow-y-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-kanban-very-dark-gray">
                  {props.list.map((item, itemIdx) => (
                    <Listbox.Option
                      key={itemIdx}
                      className={`relative cursor-pointer select-none py-2 pl-5 text-kanban-medium-grey hover:text-kanban-black dark:hover:text-kanban-white `}
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

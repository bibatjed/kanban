import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import ElipsisLogo from "../../assets/icon-vertical-ellipsis.svg";

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="w-full p-2 hover:bg-kanban-medium-grey rounded-full hover:bg-opacity-30">
          <img src={ElipsisLogo} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-2 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "text-gray-400" : "text-kanban-medium-grey"
                  }
                     group font-plus-jakarta-sans flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Edit Board
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "text-kanban-red-hover" : "text-kanban-red"
                  }
                     group flex font-plus-jakarta-sans w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Delete Board
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ElipsisLogo from "../../assets/icon-vertical-ellipsis.svg";

type MenuItem = {
  text: string;
  //ORDER IS IMPORTANT
  //first element =  active color(hovered)
  //second element = non active color
  colorPallete: string[];
};

interface IMenuItem extends MenuItem {
  onClick: () => void;
}

type DropdownProps = {
  menuItem: IMenuItem[];
};

export default function Dropdown(props: DropdownProps) {
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
            {props.menuItem.map((item, index) => {
              return (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      onClick={item.onClick}
                      className={`${
                        active ? item.colorPallete[0] : item.colorPallete[1]
                      }
                     group font-plus-jakarta-sans flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {item.text}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

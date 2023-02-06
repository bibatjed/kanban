import { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from '../components/Header';
import MenuMobile from '../components/MenuMobile';
import Modal from '../components/Modals';
import Sidebar from '../components/Sidebar';
import SideBarShow from '../components/SidebarShow';
import { useAppSelector } from '../hooks/redux';

type MainProps = {
  children: ReactNode | ReactNode[];
};
export default function Main(props: MainProps) {
  const isSidebarOpen = useAppSelector((state) => state.sidebarReducers.isOpen);
  const isMobile = useMediaQuery({
    query: '(max-width: 764px)',
  });
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      {isMobile && <MenuMobile />}
      {!isMobile && <Sidebar />}
      <Modal />
      <div
        className={`${
          isSidebarOpen && !isMobile ? 'pl-80' : ''
        } flex h-[100%] w-full gap-7 overflow-y-auto bg-kanban-light-grey-bg p-10 pt-5 transition-all duration-200 dark:bg-kanban-very-dark-gray`}
      >
        {props.children}
      </div>
      {!isMobile && <SideBarShow />}
    </div>
  );
}

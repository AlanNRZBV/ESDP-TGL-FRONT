import { Outlet } from 'react-router-dom';
import AppToolbar from '../components/UI/AppToolbar/AppToolbar';

const Layout = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

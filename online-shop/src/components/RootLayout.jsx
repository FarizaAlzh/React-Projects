import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/RootLayout.css';  

const RootLayout = () => {
  return (
    <div className="root-layout">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2025 Online Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RootLayout;

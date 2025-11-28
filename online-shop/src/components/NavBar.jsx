import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';
import { auth } from '../firebase'; 
import '../styles/NavBar.css';

const NavBar = () => {
  const { user } = useAuth(); 

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/items">Items</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={() => auth.signOut()}>Logout</button> 
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
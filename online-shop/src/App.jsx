import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './components/AuthContext.jsx';
import { Provider } from 'react-redux';  
import { store } from './store';  
import RootLayout from "./components/RootLayout";
import Home from './components/Home';
import About from './components/About';
import ItemsList from "./components/ItemsList";
import ItemDetails from "./components/ItemDetails";
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

const App = () => {
  return (
    <Provider store={store}>  
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="items" element={<ItemsList />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="profile" element={<Profile />} />
              <Route path="items/:id" element={<ItemDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
};

export default App;

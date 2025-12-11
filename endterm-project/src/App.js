import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Favorites from './components/Favorites';
import ItemsDetails from './components/ItemsDetails';
import ItemsList from './components/ItemsList';
import Login from './components/Login';
import Profile from './components/Profile'; 
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="items" element={<ItemsList />} />
              <Route path="items/:id" element={<ItemsDetails />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
              />
              <Route path="favorites" element={<Favorites />} />
            </Route>
          </Routes>
        </BrowserRouter>
  );
};
export default App;


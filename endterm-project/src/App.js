import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Favorites from './components/Favorites';
import ItemDetails from './components/ItemDetails';  
import ItemsList from './components/ItemsList';
import Login from './components/Login';
import Profile from './components/Profile'; 
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="about" element={<AboutUs />} /> 
        <Route path="items" element={<ItemsList />} /> 
        <Route path="items/:id" element={<ItemDetails />} /> 
        <Route path="login" element={<Login />} />  
        <Route path="signup" element={<Signup />} />  
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />  
            </ProtectedRoute>
          }
        />
        <Route path="favorites" element={<Favorites />} />  
        <div>
          <OfflineBanner />
        </div>
      </Routes>
    </Router>
  );
};

export default App;

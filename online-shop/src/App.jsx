import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/Home';
import About from './components/About';
import ItemsList from './components/ItemsList';
import ItemDetails from './components/ItemDetails';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="items" element={<ItemsList />} />
          <Route path="items/:id" element={<ItemDetails />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

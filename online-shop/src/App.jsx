import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from './components/Home';
import About from './components/About'
import ItemsList from "./components/ItemsList";
import ItemDetails from "./components/ItemDetails";
import Login from './components/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="items" element={<ItemsList />} />
          <Route path="login" element={<Login />} />
          <Route path="items/:id" element={<ItemDetails />} /> 
        </Route> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;

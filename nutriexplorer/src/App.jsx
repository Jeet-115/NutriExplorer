import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import { Toaster } from "react-hot-toast";
import BarcodeScanner from "./components/BarcodeScanner";

function App() {

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:barcode" element={<ProductDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/scan" element={<BarcodeScanner />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

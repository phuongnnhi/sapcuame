import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Products from './pages/Product';
import AddProduct from './pages/AddProduct';
import Dashboard from './pages/Dashboard';


const App: React.FC = () => {
    return (
<>
                    <Navbar />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/addproduct" element={<AddProduct />} />
                        </Routes>
                    </div>
                    </>
    );
};

export default App;
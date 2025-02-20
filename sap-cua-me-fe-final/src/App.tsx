import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Admin/NavBar";
import Products from "./pages/Admin/Product";
import AddProduct from "./pages/Admin/AddProduct";
import Dashboard from "./pages/Admin/Dashboard";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import LoginModal from "./pages/Authentication/LoginModal";
// import PrivateRoute from "./components/Admin/PrivateRoute";

const App: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(true);

  const handleLogin = (email: string, password: string) => {
    console.log("Logged in with:", email, password);
    setIsLoginOpen(false);
  };
  const handleSignup = (email: string, password: string) => {
    console.log("Tài khoản mới:", email, password);
    setIsAuthOpen(false); // Close modal after sign-up
  };
  return (
    <>
      <Navbar />
      <div className="content">
        <Routes>
        <Route path="/login" element={<LoginModal open={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={handleLogin}
                onSignup={handleSignup}/>} />
        {/* Admin-only routes */}
          {/* <Route element={<PrivateRoute role="admin" redirectPath="/" />}> */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/products/addproduct" element={<AddProduct />} />
            <Route
              path="/admin/products/:id/edit"
              element={<UpdateProduct />}
            />
          {/* </Route> */}
        </Routes>
      </div>
    </>
  );
};

export default App;

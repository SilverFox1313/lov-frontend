import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext'

// pages and components
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddVendor from "./pages/AddVendor";
import Footer from "./components/Footer";
import UpdateVendor from "./pages/UpdateVendor";

const App = () => {
  const { user } = useAuthContext()

  return (
    <div>
      <div className="max-w-[1100px] m-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/'/>} />
            <Route path="/add-vendor" element={user ? <AddVendor /> : <Navigate to='/login'/>} />
            <Route path="/update-vendor/:id" element={user ? <UpdateVendor /> : <Navigate to='/login'/>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

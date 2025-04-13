import React from "react";
import law from "../public/assets/images/law.png";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="flex justify-between items-center w-full py-2 border-b-2 border-gray-200">
      <Link to="/">
        <img src={law} alt="logo" width={50} />
      </Link>
      {user && (
        <div className="flex gap-2">
          <Link to="/add-vendor">
            <div className="secondary-btn">Add vendor</div>
          </Link>
          <button onClick={handleClick} className="primary-btn">
            Log out
          </button>
        </div>
      )}
      {!user && (
        <Link to='/login'>
          <div className="primary-btn">Log In</div>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;

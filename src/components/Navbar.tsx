import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recycle, Battery, User, LogOut ,MapPin } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-eco-green-dark text-white shadow-lg">
      <div className="eco-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Recycle className="h-8 w-8 mr-2 text-eco-green-light" />
              <span className="text-xl font-bold">Eco-Doc Hub</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/e-waste"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/e-waste'
                  ? 'bg-eco-green-medium text-white'
                  : 'text-gray-300 hover:bg-eco-green-medium hover:text-white'
              }`}
            >
              <Recycle className="h-4 w-4 mr-2" />
              E-Waste
            </Link>

            <Link
              to="/battery-rules"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/battery-rules'
                  ? 'bg-eco-green-medium text-white'
                  : 'text-gray-300 hover:bg-eco-green-medium hover:text-white'
              }`}
            >

              <Link
  to="/address-mapper"
  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
    location.pathname === '/address-mapper'
      ? 'bg-eco-green-medium text-white'
      : 'text-gray-300 hover:bg-eco-green-medium hover:text-white'
  }`}
>
  <MapPin className="h-4 w-4 mr-2" />
  Address Mapper
</Link>
              <Battery className="h-4 w-4 mr-2" />
              Battery Rules
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/admin'
                    ? 'bg-eco-green-medium text-white'
                    : 'text-gray-300 hover:bg-eco-green-medium hover:text-white'
                }`}
              >
                <User className="h-4 w-4 mr-2" />
                Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-eco-green-medium hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-eco-green-medium hover:text-white"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

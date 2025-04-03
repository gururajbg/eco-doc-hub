
import React from "react";
import { NavLink } from "react-router-dom";
import { Leaf, Battery, ShieldCheck } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-eco-green-dark text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-eco-green-light" />
            <span className="text-xl font-bold">Eco-Doc Hub</span>
          </NavLink>
          
          <div className="hidden md:flex space-x-6">
            <NavLink 
              to="/e-waste"
              className={({ isActive }) => 
                `flex items-center space-x-1 px-3 py-2 rounded-md transition-colors hover:bg-eco-green-medium ${
                  isActive ? 'bg-eco-green-medium' : ''
                }`
              }
            >
              <ShieldCheck className="h-5 w-5" />
              <span>E-Waste Management</span>
            </NavLink>
            
            <NavLink 
              to="/battery-rules"
              className={({ isActive }) => 
                `flex items-center space-x-1 px-3 py-2 rounded-md transition-colors hover:bg-eco-green-medium ${
                  isActive ? 'bg-eco-green-medium' : ''
                }`
              }
            >
              <Battery className="h-5 w-5" />
              <span>Battery Rules</span>
            </NavLink>
            
            <NavLink 
              to="/admin"
              className={({ isActive }) => 
                `flex items-center space-x-1 px-3 py-2 rounded-md transition-colors hover:bg-eco-green-medium ${
                  isActive ? 'bg-eco-green-medium' : ''
                }`
              }
            >
              <span>Admin</span>
            </NavLink>
          </div>
          
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu would go here */}
    </nav>
  );
};

export default Navbar;

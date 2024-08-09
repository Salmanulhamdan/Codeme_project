// Header.jsx
import React from 'react';

const Header = ({  onLogout }) => {
    return (
        <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
    {/* Left Side: Dashboard */}
    <ul className="flex items-center text-sm">
        <li className="mr-2">
            <a href="#" className="text-gray-600 hover:text-gray-800 font-medium">Dashboard</a>
        </li>
    </ul>

    {/* Right Side: Logout */}
    <ul className="ml-auto flex items-center">
        <li className="ml-3">
            <button
                type="button"
                className="bg-black text-white py-2 px-4 rounded flex items-center hover:bg-gray-800 transition-colors duration-300"
                onClick={onLogout}
            >
                <i className="ri-logout-box-line text-xl mr-2"></i>
                Logout
            </button>
        </li>
    </ul>
</div>

    
    );
};

export default Header;

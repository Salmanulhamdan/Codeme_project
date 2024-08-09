import React from 'react';

function Sidebar({ onSelect }) {
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleSelectedItem = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
    if (onSelect) onSelect(item); // Call the parent callback
  };

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform">
      <a href="#" className="flex items-center pb-4 border-b border-b-gray-800">
        <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover" />
        <span className="text-lg font-bold text-white ml-3">Logo</span>
      </a>
      <ul className="mt-4">
        <li className={`mb-1 group ${selectedItem === 'home' ? 'active' : ''}`}>
          <a
            href="#"
            className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md ${selectedItem === 'home' ? 'bg-gray-800 text-white' : ''}`}
            onClick={() => handleSelectedItem('home')}
          >
            <i className="ri-home-2-line mr-3 text-lg"></i>
            <span className="text-sm">Home</span>
          </a>
        </li>
        <li className={`mb-1 group ${selectedItem === 'clients' ? 'selected' : ''}`}>
          <a
            href="#"
            className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md ${selectedItem === 'clients' ? 'bg-gray-950 text-gray-100' : ''}`}
            onClick={() => handleSelectedItem('clients')}
          >
            <i className="ri-group-line mr-3 text-lg"></i>
            <span className="text-sm">Clients</span>
            <i className={`ri-arrow-right-s-line ml-auto ${selectedItem === 'clients' ? 'rotate-90' : ''}`}></i>
          </a>
        </li>
        <li className={`mb-1 group ${selectedItem === 'emails' ? 'selected' : ''}`}>
          <a
            href="#"
            className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md ${selectedItem === 'emails' ? 'bg-gray-950 text-gray-100' : ''}`}
            onClick={() => handleSelectedItem('emails')}
          >
            <i className="ri-mail-line mr-3 text-lg"></i>
            <span className="text-sm">Emails</span>
            <i className={`ri-arrow-right-s-line ml-auto ${selectedItem === 'emails' ? 'rotate-90' : ''}`}></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

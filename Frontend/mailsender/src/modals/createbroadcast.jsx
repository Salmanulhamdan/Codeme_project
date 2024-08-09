import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, clients as clientsEndpoint ,broadcast} from '../utilities/constants';

const CreateBroadcastModal = ({ onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch clients for the dropdown
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${baseUrl}${clientsEndpoint}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('JwtToken')}` },
        });
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleClientChange = (clientId) => {
    setSelectedClients((prevSelected) =>
      prevSelected.includes(clientId)
        ? prevSelected.filter((id) => id !== clientId)
        : [...prevSelected, clientId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}${broadcast}`, {
        name,
        clients: selectedClients,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('JwtToken')}` },
      });
      onCreate(response.data);
    } catch (error) {
      console.error('Error creating broadcast:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Create Broadcast</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Broadcast Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Clients</label>
            <div className="flex flex-wrap gap-2">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedClients.includes(client.id)}
                    onChange={() => handleClientChange(client.id)}
                    className="mr-2"
                  />
                  <span>{client.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBroadcastModal;

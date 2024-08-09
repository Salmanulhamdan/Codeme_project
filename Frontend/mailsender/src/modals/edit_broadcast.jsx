import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, clients,broadcast } from '../utilities/constants';

const EditBroadcastModal = ({ selectedbroadcast, onClose, onUpdate }) => {
  const [selectedClients, setSelectedClients] = useState([]);
  const [availableClients, setAvailableClients] = useState([]);
  const [broadcastName, setBroadcastName] = useState(selectedbroadcast.name);

  useEffect(() => {
    // Fetch all clients
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${baseUrl}${clients}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('JwtToken')}` },
        });
        setAvailableClients(response.data);
        setSelectedClients(selectedbroadcast.clients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, [selectedbroadcast]);
  console.log(availableClients,"availableclients");
  console.log(selectedClients,"selectedClients");
  

  const handleSave = async () => {
    try {

      const clientIds = selectedClients
            .map(client => Number(client))
            .filter(id => !isNaN(id)); // Filter out any NaN values

        console.log('Valid Client IDs:', clientIds); // This should log a clean array of integers

        const data = {
            name: broadcastName,
            clients: clientIds,
        };
      await axios.put(`${baseUrl}${broadcast}${selectedbroadcast.id}/`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('JwtToken')}` },
      });
      onUpdate({ ...broadcast, name: broadcastName, clients: selectedClients });
      onClose();
    } catch (error) {
      console.error('Error updating broadcast:', error);
    }
  };

  // const toggleClientSelection = (client) => {
  //   if (selectedClients.some(c => c === client.id)) {
  //     setSelectedClients(selectedClients.filter(c => c !== client.id));
  //   } else {
  //     setSelectedClients([...selectedClients, client]);
  //   }
  // };

  const toggleClientSelection = (client) => {
    setSelectedClients(prevSelectedClients => {
      let updatedSelectedClients;
      if (prevSelectedClients.includes(client.id)) {
        updatedSelectedClients = prevSelectedClients.filter(id => id !== client.id);
      } else {
        updatedSelectedClients = [...prevSelectedClients, client.id];
      }
      console.log("Updated Selected Clients:", updatedSelectedClients);
      return updatedSelectedClients;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Broadcast</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Broadcast Name</label>
          <input
            type="text"
            value={broadcastName}
            onChange={(e) => setBroadcastName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Clients</label>
          <div className="h-40 overflow-y-scroll border rounded p-2">
            {availableClients.map(client => (
              <div key={client.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedClients.some(c => c === client.id)}
                  onChange={() => toggleClientSelection(client)}
                  className="mr-2"
                />
                <span>{client.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBroadcastModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, clients } from '../utilities/constants';
import CreateClientModal from '../modals/client_create';
import Swal from 'sweetalert2';
import ClientEditModal from '../modals/client_edit';
const UserAccounts = () => {
  const [ClientList, setClientList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false); // State for edit modal
  const [selectedClient, setSelectedClient] = useState(null); // State for the selected client

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  }
    const openEditModal = (client) => {
      setSelectedClient(client); // Set the selected client data
      setEditModalIsOpen(true); // Open the edit modal
    };
  
    const closeEditModal = () => {
      setEditModalIsOpen(false);
    };

    const getList = async () => {
      try {
        const response = await axios.get(`${baseUrl}${clients}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('JwtToken')}`,
          },
        });
        setClientList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
  
    // Call getList inside useEffect
    useEffect(() => {
      getList();
    }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}${clients}${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('JwtToken')}`,
        },
      });
      setClientList(ClientList.filter(client => client.id !== id));
      Swal.fire("Deleted!", "The client has been deleted.", "success");
    } catch (error) {
      console.error('Error deleting client:', error);
      Swal.fire("Error", "There was an issue deleting the client.", "error");
    }
  };



  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">Clients</h2>
          <span className="text-xs text-gray-500">View accounts of registered clients</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="ml-10 space-x-8 lg:ml-40">
            <button 
              className="ml-4 flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-green-700" 
              onClick={openModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0-15h-3.75M12 4.5v15m0-15h3.75" />
              </svg>
              Create Client
            </button>
            <CreateClientModal getlist={getList} isOpen={modalIsOpen} onClose={closeModal} />
          </div>
        </div>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Place</th>
                <th className="px-5 py-3"></th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {ClientList.map((client) => (
                <tr key={client.id}>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{client.name}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{client.email}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{client.phone}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{client.place}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <button onClick={() => openEditModal(client)} className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <ClientEditModal isOpen={editModalIsOpen} closeModal={closeEditModal} client={selectedClient} />

                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <button 
                      className="text-red-600 hover:underline" 
                      onClick={() => handleDelete(client.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserAccounts;

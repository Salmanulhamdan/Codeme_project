import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; 
import axios from "axios";
import { baseUrl,clients } from '../utilities/constants';
import Swal from "sweetalert2";

const ClientEditModal = ({ isOpen, closeModal, client, setUpdateUI }) => {
  const [name, setName] = useState(client?.name ?? '');
  const [email, setEmail] = useState(client?.email ?? '');
  const [phone, setPhone] = useState(client?.phone ?? '');
  const [place, setPlace] = useState(client?.place ?? '');

  useEffect(() => {
    setName(client?.name ?? '');
    setEmail(client?.email ?? '');
    setPhone(client?.phone ?? '');
    setPlace(client?.place ?? '');
  }, [client]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('JwtToken');
      const response = await axios.patch(`${baseUrl}${clients}${client.id}/`, 
        { name, email, phone, place },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Client updated successfully!');
        setUpdateUI(prev => !prev);
        Swal.fire("Updated!", "Client information has been updated.", "success");
      } else {
        console.error('Error updating client:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating client:', error.message);
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Client Modal"
      className="modal-content p-4 bg-white shadow-md max-w-md mx-auto mt-20"
    >
      <div className="modal-content p-4 bg-white max-w-md mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4">Edit Client</h2>
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="form-group">
          <label htmlFor="place" className="block text-sm font-medium text-gray-700">Place</label>
          <input
            type="text"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <br />
        <div className="flex justify-between">
          <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Submit</button>
          <button onClick={closeModal} className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default ClientEditModal;

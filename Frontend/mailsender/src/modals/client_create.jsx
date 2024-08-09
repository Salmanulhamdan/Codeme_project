import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { baseUrl,clients } from '../utilities/constants';
import Swal from 'sweetalert2';

const CreateClientModal = ({ getlist, isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [place, setPlace] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('JwtToken');
      const formData = {
        name,
        email,
        phone,
        place,
      };

      const response = await axios.post(`${baseUrl}${clients}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        // Handle successful client creation, e.g., show a success message
        console.log('Client created successfully!');
        Swal.fire('Created!', 'The client has been created.', 'success');
        getlist();
      } else {
        // Handle errors, e.g., show an error message to the user
        console.error('Error creating client:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating client:', error.message);
    }
    onClose();
  };
  useEffect(() => {
    
  }, [onClose]);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Create Client Modal"
      className="modal-content p-4 bg-white shadow-md max-w-md mx-auto mt-20"
    >
      <div className="modal-content p-4 bg-white max-w-md mx-auto mt-20">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Create Client</h2>
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
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
              required
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
              required
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
              required
            />
          </div>
          <br />
          <div className="flex justify-between">
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Submit
            </button>
            <button onClick={onClose} className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateClientModal;

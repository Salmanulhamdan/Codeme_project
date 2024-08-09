import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { baseUrl, createpersonalmessage, createbrodcastmail } from '../utilities/constants';

const CreateMailModal = ({ isOpen, onClose, selectedClient, selectedBroadcast }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('JwtToken');
      const formData = {
        subject,
        body,
        client: selectedClient ? selectedClient.id : null,
        broadcast: selectedBroadcast ? selectedBroadcast.id : null,
      };

      const url = selectedClient ? `${baseUrl}${createpersonalmessage}` : `${baseUrl}${createbrodcastmail}`;
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Swal.fire('Created!', 'The message has been sent.', 'success');
      } else {
        console.error('Error creating message:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating message:', error.message);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Create Mail Modal"
      className="modal-content p-4 bg-white shadow-md max-w-md mx-auto mt-20"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Create Mail</h2>
        <div className="form-group mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            rows="4"
            required
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Submit
          </button>
          <button type="button" onClick={onClose} className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateMailModal;

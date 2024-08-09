import React, { useState, useEffect } from "react";
import axios from 'axios';
import { baseUrl,clients,broadcast ,personalmessages,broadcastmessages} from "../utilities/constants";
import CreateMailModal from "../modals/create_mail";
import CreateBroadcastModal from "../modals/createbroadcast";
import EditBroadcastModal from "../modals/edit_broadcast";
import defaultImage from "../assets/person-circle.svg"
import groupimage from "../assets/team.svg"
const ChatWeb = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showClients, setShowClients] = useState(true); // Track whether to show clients or broadcasts
  const [clientslist, setClientslist] = useState([]);
  const [broadcastslist, setBroadcastslist] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedBroadcast, setSelectedBroadcast] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createBroadcastModalOpen, setCreateBroadcastModalOpen] = useState(false);
  const [showEditBroadcastModal, setShowEditBroadcastModal] = useState(false);
  const [isChatActive, setIsChatActive] = useState(true);

 // Fetch messages for the selected client
  const fetchPersonalMessages = async (clientId) => {
    try {
      const response = await axios.get(`${baseUrl}${personalmessages}`, {
        params: {
          client: clientId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('JwtToken')}`,
        },
      });
      setMessages(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching personal messages:', error);
    }
  };
// Fetch messages for the selected broadcast
  const fetchBroadcastMessages = async (broadcastId) => {
    try {
      const response = await axios.get(`${baseUrl}${broadcastmessages}`, {
        params: {
          broadcast: broadcastId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('JwtToken')}`,
        },
      });
      const uniqueMessages = response.data.reduce((acc, current) => {
        // Check if the unique_id already exists in the accumulator
        const exists = acc.find(item => item.unique_id === current.unique_id);
        
        // If it doesn't exist, add the current item to the accumulator
        if (!exists) {
            acc.push(current);
        }
    
        return acc;
    }, []);
    
    // Set the state with the unique messages
    setMessages(uniqueMessages);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching broadcast messages:', error);
    }
  };
  //dlete broadcast
  const handleDeleteBroadcast = async () => {
    if (selectedBroadcast) {
      try {
        await axios.delete(`${baseUrl}${broadcast}${selectedBroadcast.id}/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('JwtToken')}` },
        });
        setBroadcastslist((prevBroadcasts) =>
          prevBroadcasts.filter((broadcast) => broadcast.id !== selectedBroadcast.id)
        );
        setSelectedBroadcast(null);
      } catch (error) {
        console.error('Error deleting broadcast:', error);
      }
    }
  };

  //edit broadcast

  const handleUpdateBroadcast = (updatedBroadcast) => {
    // Update the broadcast list with the updated broadcast data
    setBroadcastslist(prevBroadcasts =>
      prevBroadcasts.map(broadcast => 
        broadcast.id === updatedBroadcast.id ? updatedBroadcast : broadcast
      )
    );
  };

  useEffect(() => {
    // Fetch clients
    const fetchClients = async () => {
        try {
          const response = await axios.get(`${baseUrl}${clients}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('JwtToken')}`,
            },
          });
          setClientslist(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching clients:', error);
        }
      };
  
      const fetchBroadcasts = async () => {
        try {
          const response = await axios.get(`${baseUrl}${broadcast}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('JwtToken')}`,
            },
          });
          setBroadcastslist(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching broadcasts:', error);
        }
      };

   

   


  
      fetchClients();
      fetchBroadcasts();

      

   
      if (selectedClient) {
        fetchPersonalMessages(selectedClient.id);
      } else if (selectedBroadcast) {
        fetchBroadcastMessages(selectedBroadcast.id);
      }
  }, [selectedClient,selectedBroadcast]);

  return (
    <div className="flex h-screen overflow-hidden">
  {/* Sidebar */}
  <div className="w-1/4 bg-white border-r border-gray-300 flex flex-col">
    {/* Sidebar Header */}
    <header className="border-b border-gray-300 flex justify-between items-center text-white bg-gray-700 rounded-md h-[60px] text-[16px] font-semibold">
    <div
className={`${
  isChatActive ? "w-[80%] bg-indigo-600 opacity-100" : "w-[20%] bg-gray-600 opacity-50"
} h-full transition-all duration-300 ease-in-out shadow-lg flex items-center justify-center`}
      onClick={() => {
        setIsChatActive(true);
        setShowClients(true);
        setSelectedBroadcast(null);
      }}
    >
      Chat
    </div>
    <div
     className={`${
      isChatActive ? "w-[20%] bg-gray-600 opacity-50" : "w-[80%] bg-indigo-600 opacity-100"
    } h-full transition-all duration-300 ease-in-out shadow-lg flex items-center justify-center`}
      onClick={() => {
        setIsChatActive(false);
        setShowClients(false);
        setSelectedClient(null);
      }}
    >
      Broadcast
    </div>
  </header>
    {/* Contact List */}
    <div className="flex-1 overflow-y-auto p-3 mb-9">
      {showClients ? (
        <>
          <h2 className="text-lg font-semibold mb-2">Clients</h2>
          {clientslist.map((client) => (
            <div
              key={client.id}
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              onClick={() => setSelectedClient(client)}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src={client.img || defaultImage} alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{client.name}</h2>
                <p className="text-gray-600">{}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
       <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Broadcasts</h2>
                <button
                  onClick={() => setCreateBroadcastModalOpen(true)}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md"
                >
                  Create Broadcast
                </button>
              </div>
        {broadcastslist.map((broadcast) => (
          <div
            key={broadcast.id}
            className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
            onClick={() => setSelectedBroadcast(broadcast)}
          >
            <div className="w-12 p-[6px] flex items-center justify-center h-12 bg-gray-300 rounded-full mr-3">
              <img src={broadcast.img || groupimage} alt="Broadcast Avatar" className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{broadcast.name}</h2>
            </div>
          </div>
        ))}
      </>
      )}
    </div>
  </div>

  {/* Main Chat Area */}
  <div className="flex-1 flex flex-col overflow-y-auto">
    {/* Chat Header */}
    <header className="bg-white p-4 text-gray-700 border-b flex w-full justify-between items-center flex-wrap border-gray-300">
      <h1 className="text-2xl font-semibold">
        {selectedClient ? selectedClient.name : selectedBroadcast ? selectedBroadcast.name : 'Select a Client or Broadcast'}
      </h1>
      <div className="flex  ">  {selectedBroadcast && (
        <button
          onClick={handleDeleteBroadcast}
          className="bg-red-600 text-white py-2 px-4 rounded-md"
        >
          Delete Broadcast
        </button>
      )}

{selectedBroadcast && (
        <button
          onClick={() => setShowEditBroadcastModal(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md ml-4"
        >
          Edit Broadcast
        </button>
      )}</div>
    
    </header>

    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto p-4">
    {messages.map((message, index) => (
            <div key={index} className={`flex items-start mb-4 ${message.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* <img src={message.sender.img} alt={message.sender.name} className="w-12 h-12 rounded-full" /> */}
              <div className={`ml-3 ${message.sender === 'me' ? 'mr-3' : 'ml-3'}`}>
                <div className={`py-2 px-4 rounded-lg ${message.sender === 'me' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  <p className="text-lg font-bold">{message.subject}</p>
                  <p className="text-lg">{message.body}</p>
                  <p className="text-sm text-gray-500 mt-1">{new Date(message.sent_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
    </div>

    {/* Create Mail Button */}
    <div className="fixed bottom-4 right-4">
      <button className="bg-indigo-600 text-white py-2 px-14 rounded-full" onClick={() => setModalOpen(true)}>Create Mail</button>
    </div>
    <CreateMailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedClient={selectedClient}
        selectedBroadcast={selectedBroadcast}
      />

{createBroadcastModalOpen && (
        <CreateBroadcastModal
          onClose={() => setCreateBroadcastModalOpen(false)}
          onCreate={(newBroadcast) => {
            setBroadcastslist([...broadcastslist, newBroadcast]);
            setCreateBroadcastModalOpen(false);
          }}
        />
      )}
        {showEditBroadcastModal && (
        <EditBroadcastModal
        selectedbroadcast={selectedBroadcast}
          onClose={() => setShowEditBroadcastModal(false)}
          onUpdate={handleUpdateBroadcast}
        />
      )}
  </div>
</div>


  );
};

export default ChatWeb;

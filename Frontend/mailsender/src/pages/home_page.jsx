import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { baseUrl, user, refresh } from '../utilities/constants';
import UserAccounts from './clients';
import ChatWeb from './chat_page';

function HomePage() {
  const navigate = useNavigate();
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('home');

  const handleSidebarSelect = (item) => {
    setSelectedSidebarItem(item);
  };

  const logout = () => {
    localStorage.removeItem('JwtToken');
    localStorage.removeItem('RefreshjwtToken');
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('JwtToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(baseUrl + user, config);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const refreshResponse = await axios.post(baseUrl + refresh, {
              refresh: localStorage.getItem('RefreshjwtToken'),
            });
            const newAccessToken = refreshResponse.data.access;
            const newRefreshToken = refreshResponse.data.refresh;
            localStorage.setItem('JwtToken', newAccessToken);
            localStorage.setItem('RefreshjwtToken', newRefreshToken);
            const retryConfig = {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            };
            await axios.get(baseUrl + user, retryConfig);
          } catch (refreshError) {
            console.error('Error refreshing access token:', refreshError);
          }
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    switch (selectedSidebarItem) {
      case 'home':
        return <h1>Home Page Content</h1>;
      case 'clients':
        return <UserAccounts />
      case 'emails':
        return <ChatWeb />
      default:
        return <h1>Welcome</h1>;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={handleSidebarSelect} />
      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main overflow-hidden">
        <Header onLogout={logout} />
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default HomePage;

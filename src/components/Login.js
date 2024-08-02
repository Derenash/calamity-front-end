import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import { useAuction } from '../context/AuctionContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [auctionId, setAuctionId] = useState('');
  const navigate = useNavigate();
  const { setAuctionId: setGlobaAuctionId } = useAuction();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      localStorage.setItem('token', token);
      setGlobaAuctionId(auctionId);
      navigate('/auction');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="text"
        value={auctionId}
        onChange={(e) => setAuctionId(e.target.value)}
        placeholder="Auction ID"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

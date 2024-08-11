import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      navigate('/auction');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleObserverEntry = () => {
    // Enter as an observer without authentication
    navigate('/auction');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Login"
          className="login-input"
        />
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" className="login-button">Join</button>
        <button type="button" className="observer-button" onClick={handleObserverEntry}>Observer</button>
      </form>
      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/calamity_logo_1.png`} alt="Calamity Logo" className="logo" />
      </div>
    </div>
  );
};

export default Login;

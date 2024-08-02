import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AuctionRoom from './components/AuctionRoom';
import { AuctionProvider } from './context/AuctionContext';

const App = () => {
  return (
    <AuctionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auction" element={<AuctionRoom />} />
        </Routes>
      </Router>
    </AuctionProvider>
  );
};

export default App;
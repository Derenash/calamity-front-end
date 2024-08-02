import React, { createContext, useState, useContext } from 'react';

const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [auctionId, setAuctionId] = useState('');

  return (
    <AuctionContext.Provider value={{ auctionId, setAuctionId }}>
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => useContext(AuctionContext);

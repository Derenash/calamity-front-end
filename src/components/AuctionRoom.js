// AuctionRoom.js
import React, { useState, useEffect } from 'react';
import { fetchPlayers, buyPlayer } from '../utils/api';
import { connectSocket, onPlayerUpdate, onAuctionStatusUpdate } from '../utils/socket';
import PlayerList from './PlayerList';
import { useAuction } from '../context/AuctionContext';

const AuctionRoom = () => {
  const [players, setPlayers] = useState([]);
  const [auctionStatus, setAuctionStatus] = useState('');
  const [availableCoins, setAvailableCoins] = useState(0);
  const { auctionId } = useAuction();

  useEffect(() => {
    const initAuction = async () => {
      const fetchedPlayers = await fetchPlayers(auctionId);
      setPlayers(fetchedPlayers);
      connectSocket();
      onPlayerUpdate((updatedPlayer) => {
        setPlayers((prevPlayers) =>
          prevPlayers.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
        );
      });
      onAuctionStatusUpdate(setAuctionStatus);
    };

    initAuction();
  }, [auctionId]);

  const handleBuy = async (playerId) => {
    try {
      await buyPlayer(playerId);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <div>
      <h1>Auction Room</h1>
      <p>Status: {auctionStatus}</p>
      <p>Available Coins: {availableCoins}</p>
      <PlayerList players={players} onBuy={handleBuy} />
    </div>
  );
};

export default AuctionRoom;

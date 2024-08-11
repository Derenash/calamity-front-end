// AuctionRoom.js
import React, { useState, useEffect } from 'react';
import { fetchPlayers, buyPlayer, fetchCaptains } from '../utils/api';
import { connectSocket, disconnectSocket, onUpdate, } from '../utils/socket';
import AvailablePlayersList from './AvailablePlayersList';
import TeamList from './TeamList';
import TransactionHistory from './TransactionHistory';
import { useAuction } from '../context/AuctionContext';
import './auction.css';

const AuctionRoom = () => {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [auctionStatus, setAuctionStatus] = useState('');
  const { auctionId } = useAuction();

  useEffect(() => {
    const initAuction = async () => {
      try {
        await updateAuction();
        connectSocket();
        onUpdate(handlePlayerUpdate);
      } catch (error) {
        console.error('Failed to initialize auction:', error);
      }
    };

    initAuction();

    return () => {
      disconnectSocket();
    };
  }, [auctionId]);

  const updateAuction = async () => {
    // Fetch all players
    const fetchedPlayers = await fetchPlayers(auctionId);

    // Filter available players (no owner and not a captain)
    const availablePlayers = fetchedPlayers.filter(player =>
      player.ownerUsername === null && player.isCaptainUsername === null
    );
    setAvailablePlayers(availablePlayers);

    const fetchedCaptains = await fetchCaptains(auctionId);

    // Filter captains
    const captains = fetchedPlayers.filter(player => player.isCaptainUsername !== null);

    // Create initial teams array
    const teamsArray = captains.map(captain => {
      const captainData = fetchedCaptains.find(c => c.username === captain.isCaptainUsername);
      return {
        id: captain.isCaptainUsername,
        captain: captain,
        coins: captainData?.coins || 0,
        players: []
      };
    });

    // Filter players with an owner
    const ownedPlayers = fetchedPlayers.filter(player => player.ownerUsername !== null);

    // Add owned players to their respective teams
    ownedPlayers.forEach(player => {
      const team = teamsArray.find(team => team.id === player.ownerUsername);
      if (team) {
        team.players.push(player);
      } else {
        console.warn(`Team for owner ${player.ownerUsername} not found. Skipping player ${player.id}`);
      }
    });

    // Update the teams state
    setTeams(teamsArray);
  };


  const updateTeams = async () => { }


  const handlePlayerUpdate = () => {
    console.log("A player has been bought")
    updateAuction();
  };

  const handleBuy = async (player) => {
    try {
      await buyPlayer(auctionId, player.id, player.price, player.ownerUsername);
      // The actual update will be handled by the socket event
    } catch (error) {
      console.error('Purchase failed:', error);
      // You might want to show an error message to the user here
    }
  };

  const username = localStorage.getItem('username');
  const sortedTeams = teams.sort((teamA, teamB) => {
    if (teamA.captain.isCaptainUsername === username) {
      return -1;
    } else if (teamB.captain.isCaptainUsername === username) {
      return 1;
    }
  });

  return (
    <div className="auction-room">
      <TransactionHistory />
      <h1 className="auction-title">Calamity Divisão A</h1>
      <div className="auction-content">
        <AvailablePlayersList players={availablePlayers} onBuy={handleBuy} />
        <TeamList teams={teams} onBuy={handleBuy} />
      </div>
    </div>
  );
};

export default AuctionRoom;

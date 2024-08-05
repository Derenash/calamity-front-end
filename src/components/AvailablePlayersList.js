// src/components/AvailablePlayersList.js
import React, { useState } from 'react';
import PlayerCard from './PlayerCard';
import { getRoleImage } from '../utils/playerCardUtils';
import { useAuction } from '../context/AuctionContext';

const AvailablePlayersList = ({ players, onBuy }) => {
  const roles = ['TANK', 'DPS', 'HEALER', 'FLEX', 'SOLO'];
  const [selectedRoles, setSelectedRoles] = useState(roles);
  const { favorites } = useAuction();

  const toggleRole = (role) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const sortedPlayers = players.sort((a, b) => {
    const aFav = favorites.includes(a.id);
    const bFav = favorites.includes(b.id);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });

  const filteredPlayers = selectedRoles.length === 0
    ? sortedPlayers
    : sortedPlayers.filter(player =>
      selectedRoles.includes(player.primaryRole) || selectedRoles.includes(player.secondaryRole)
    );

  return (
    <div className="available-players-list">
      <h2>Available Players</h2>
      <div className="role-filters">
        {roles.map(role => (
          <button
            key={role}
            onClick={() => toggleRole(role)}
            className={`role-filter ${selectedRoles.includes(role) ? 'active' : ''}`}
          >
            {getRoleImage(role)}
          </button>
        ))}
      </div>
      {filteredPlayers.map((player) => (
        <PlayerCard key={player.id} player={player} onBuy={onBuy} isCaptain={false} />
      ))}
    </div>
  );
};

export default AvailablePlayersList;

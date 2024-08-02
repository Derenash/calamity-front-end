// PlayerList.js
import React from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = ({ players, onBuy }) => {
  return (
    <div className="player-list">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} onBuy={onBuy} />
      ))}
    </div>
  );
};

export default PlayerList;

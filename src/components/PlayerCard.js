// PlayerCard.js
import React from 'react';

const PlayerCard = ({ player, onBuy }) => {
  return (
    <div className="player-card">
      <h3>{player.name}</h3>
      <div className="player-price-buy">
        <span>Price: {player.currentPrice}</span>
        <button onClick={() => onBuy(player.id)}>Buy</button>
      </div>
    </div>
  );
};

export default PlayerCard;

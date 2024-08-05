import React from 'react';
import { getFlagImage, getRoleImage } from '../utils/playerCardUtils';

const PlayerCard = ({ player, onBuy, isCaptain }) => {
  const playerInfoClass = isCaptain ? 'player-info captain' : 'player-info';
  return (
    <div className="available-player-card" >
      <div className={playerInfoClass}>
        <div className="player-name-battletag">
          <span className="player-name">{player.name}</span>
          <span className="player-battletag">{player.battleTag}</span>
        </div>
        <div className="player-details">
          <span className="player-nationality">
            {getFlagImage(player.nationality)}
          </span>
          <span className="player-role">
            {getRoleImage(player.primaryRole)}
          </span>
          {player.secondaryRole && (
            <span className="player-secondary-role">
              {getRoleImage(player.secondaryRole)}
            </span>
          )}
        </div>
        {!isCaptain && (
          <>
            <span className="player-price">${player.price}</span>
            <button className="buy-button" onClick={() => onBuy(player.id)}>
              BUY
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;

import React from 'react';
import { getEloImage, getFlagImage, getRoleImage, getSpokenLanguages } from '../utils/playerCardUtils';
import { useAuction } from '../context/AuctionContext';

function canPick(nationalityA, nationalityB) {
  if (nationalityA === "BR" | nationalityB === "BR") {
    return nationalityA === nationalityB
  }
  return true
}


const PlayerCard = ({ player, onBuy, isCaptain }) => {
  const { favorites, toggleFavorite } = useAuction();
  const isFavorite = favorites.includes(player.id);

  const availablePlayerCardClass = `available-player-card ${isFavorite ? 'favorite' : ''}`;
  const playerInfoClass = `player-info ${isCaptain ? 'captain' : ''}`;

  return (
    <div className={availablePlayerCardClass}>
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
          <span className="player-elo">
            {getEloImage(player.rank)}
          </span>
          <div className="spoken-languages-container">
            Languages
            <div className="spoken-languages">
              {getSpokenLanguages(player.languages)}
            </div>
          </div>
        </div>
        {!isCaptain && (
          <>
            <span className="player-price">${player.price}</span>
            {player.isLocked !== true && (localStorage.getItem('observer') === 'false') && (
              <button className="buy-button" onClick={() => onBuy(player)}>
                BUY
              </button>
            )}

          </>
        )}
        {!isCaptain && (
          <span
            className="favorite-star"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(player.id);
            }}
          >
            {isFavorite ? '★' : '☆'}
          </span>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;

// TeamList.js
import React from 'react';
import PlayerCard from './PlayerCard';

const TeamCard = ({ team }) => {
  console.log(JSON.stringify(team, null, 2));
  return (
    <div className="team-card">
      <div className="team-header">
        <h3 className="team-name">{team.captain.name}'s Team</h3>
        <p className="team-gold">{team.coins} Coins</p>
      </div>
      <div className="team-captain">
        <PlayerCard player={team.captain} isCaptain={true} />
      </div>
      <div className="team-players">
        {team.players.map((player) => (
          <PlayerCard key={player.id} player={player} isCaptain={false} />
        ))}
      </div>
    </div>
  );
};

const TeamList = ({ teams }) => {
  return (
    <div className="team-list">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
};

export default TeamList;

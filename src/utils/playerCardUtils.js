// src/utils/flagUtils.js

export const getFlagImage = (countryCode) => {
  const flagUrl = `/flags/${countryCode.toLowerCase()}_flag.png`;
  return (
    <img
      src={flagUrl}
      alt={`${countryCode} flag`}
      className="player-icon"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/flags/unknown_flag.png"; // fallback image
      }}
    />
  );
};

export const getRoleImage = (role) => {
  const roleUrl = `/roles/${role.toLowerCase()}.png`;
  return (
    <img
      src={roleUrl}
      alt={`${role} role`}
      className="player-icon"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/roles/unknown_role.png"; // fallback image
      }}
    />
  );
};
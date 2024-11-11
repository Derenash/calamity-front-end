
export function canPick(nationalityA, nationalityB) {
  if (nationalityA === "BR" | nationalityB === "BR") {
    return nationalityA === nationalityB
  }
  return true
}

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

export const getEloImage = (elo) => {
  const eloUrl = `/elos/${elo.toLowerCase()}.png`;
  return (
    <img
      src={eloUrl}
      alt={`${elo} elo`}
      className="player-icon"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/elos/gold.png"; // fallback image
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

export const getSpokenLanguages = (languageCodes) => {
  return languageCodes.map((langCode) => {
    const flagUrl = `/flags/${langCode.toLowerCase()}_flag.png`;
    return (
      <img
        key={langCode}
        src={flagUrl}
        alt={`${langCode} flag`}
        className="player-icon lang"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/flags/unknown_flag.png"; // fallback image
        }}
      />
    );
  });
};
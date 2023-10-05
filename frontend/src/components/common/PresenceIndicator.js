import React from 'react';

const PresenceIndicator = ({ online }) => {
  return (
    <div>
      {online ? (
        <span style={{ color: 'green' }}>Online</span>
      ) : (
        <span style={{ color: 'red' }}>Offline</span>
      )}
    </div>
  );
};

export default PresenceIndicator;

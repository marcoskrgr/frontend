import React from 'react';

function Hexagon({ size = 200, children }) {
  const dimensionW = typeof size === 'number' ? `${size}px` : size;
  const dimensionH = typeof size === 'number' ? `${size * 0.86602540378}px` : size;

  const containerStyle = {
    width: dimensionW,
    height: dimensionH,
    background: 'linear-gradient(to right, #0075FF, #00c8ff)',
    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const innerStyle = {
    width: '94%',
    height: '94%',
    backgroundColor: '#ccc',
    clipPath: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  );
}

export default Hexagon;
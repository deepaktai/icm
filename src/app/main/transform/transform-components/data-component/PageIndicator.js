// PageIndicator.js
import React from 'react';

function PageIndicator({ activeStep, totalSteps }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      <p style={{ fontSize: '16px', color: '#333' }}>{`Page ${activeStep}/${totalSteps}`}</p>
    </div>
  );
}

export default PageIndicator;

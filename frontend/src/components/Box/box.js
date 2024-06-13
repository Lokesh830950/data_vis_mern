import React from 'react';
import './box.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';


const Box = () => {
  return (
    <div className="box">
      <div className="content">
        <div className="database-icon">
          <FontAwesomeIcon icon={faDatabase} size="2x" />
          <h1>About the Data</h1>
        </div>
        
        {/* Additional content */}
      </div>
    </div>
  );
};

export default Box;

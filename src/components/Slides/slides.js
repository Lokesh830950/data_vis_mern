import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './slides.css'; // Assuming you have this CSS file
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

const Slide = ({ color, statistics }) => {
  const subjects = ['Science', 'English', 'History', 'Maths'];

  return (
    <div className="Slide" style={{ backgroundColor: color }}>
      {statistics ? (
        subjects.map((subject, index) => (
          <div key={index} className="chart-container">
            <h3>{subject} Statistics</h3>
            <div className="chart">
              {/* Recharts BarChart goes here */}
            </div>
            {/* Other chart components */}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const Slides = () => {
  const [statistics, setStatistics] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/stats');
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='main'>
      <div className="Slides">
        <Slide statistics={statistics} color="yourColorValue" />
        <Slide statistics={statistics} color="yourColorValue" />
        <Slide statistics={statistics} color="yourColorValue" />
        <Slide statistics={statistics} color="yourColorValue" />
        <Slide statistics={statistics} color="yourColorValue" />
        <Slide statistics={statistics} color="yourColorValue" />
      </div>

      <div className="box">
        <div className="content">
          <div className="database-icon">
            <FontAwesomeIcon icon={faDatabase} size="2x" />
            <h6>About the Data</h6>
          </div>
          {/* Additional content */}
        </div>
      </div>
    </div>
  );
};

export default Slides;

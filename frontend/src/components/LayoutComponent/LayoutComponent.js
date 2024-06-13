import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import './LayoutComponent.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const LayoutComponent = () => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/stats", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setStatistics(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderGradientBar = (statistic) => {
    const stats = statistics[statistic];
    const data = Object.keys(stats).map((attribute) => ({
      name: attribute,
      value: stats[attribute],
    }));
    
    const customColorRGB = 'rgb(255, 165, 0)';
    
    return (
      <div className="box" key={statistic}>
        <h3>{statistic}</h3>
        <div className="chart">
          <BarChart width={185.56} height={150} data={data} className='bar'>
            <XAxis  tick={{ fill: 'white' }} />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip />
            <Bar dataKey="value" fill={customColorRGB} />
          </BarChart>
        </div>
      </div>
    );
  };

  return (
    <div className="layout-container">
      <div className="left-half">
        {Object.keys(statistics).map((statistic) => renderGradientBar(statistic))}
      </div>
      <div className="right-half">
        <div className="textarea">
          <div className='name'>
          <FontAwesomeIcon icon={faDatabase} size="2x" />
          <p className='about'>About the data</p>
          </div>
          <p className='para'>The dataset represents a collection of student records, each comprising various attributes including the student's ID, name, gender, age, section, and performance scores in different subjects such as Science, English, History, and Maths. The data encompasses diverse demographics, reflecting both male and female students across different age groups, sections, and academic performances.

Analyzing the dataset reveals interesting trends. Students' performance varies significantly across subjects, highlighting their strengths and areas that might need improvement. The scores in subjects like Science and English tend to be higher on average, while History and Maths exhibit a wider range of scores. Gender and section-wise comparisons could offer insights into potential disparities in academic achievements.

Furthermore, the data set is composed of both high and low performing students, with some individuals achieving remarkable scores across all subjects, suggesting their exceptional abilities. Conversely, there are students who face challenges in particular subjects, perhaps indicating the need for targeted educational support.

This dataset could be valuable for educational institutions aiming to enhance student learning experiences. By identifying factors contributing to academic success or struggles, educators can tailor their teaching methods to better address individual needs. Additionally, it can provide insights into the distribution of scores and the diversity of academic capabilities among students, informing decisions on curriculum development and resource allocation.</p>
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;

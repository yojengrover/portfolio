
import React, { useState } from 'react';
import './CalculateMinutes.css';

const CaclculateMinutes = () => {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const [minutes, setMinutes] = useState(new Array(daysInMonth).fill(0));
  const [totalMonthMinutes, setTotalMonthMinutes] = useState(0);
  const [totalOverallMinutes, setTotalOverallMinutes] = useState(0);

  const updateMinutes = (day, value) => {
    const updatedMinutes = [...minutes];
    updatedMinutes[day - 1] = parseInt(value, 10) || 0;
    setMinutes(updatedMinutes);
    calculateTotalMinutes();
  };

  const calculateTotalMinutes = () => {
    const monthTotal = minutes.reduce((acc, min) => acc + min, 0);
    setTotalMonthMinutes(monthTotal);
    const overallTotal = minutes.reduce((acc, min) => acc + min, totalOverallMinutes);
    setTotalOverallMinutes(overallTotal);
  };

  const resetMinutes = () => {
    setMinutes(new Array(daysInMonth).fill(0));
    setTotalMonthMinutes(0);
    setTotalOverallMinutes(0);
  };

  return (
    <div className="calculate-container">
      <div className="calendar">
        <h2>{new Date().toLocaleString('default', { month: 'long' })}</h2>
        <table>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() }, (_, i) => (
                <td key={`empty-${i}`}></td>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => (
                <td key={`day-${i + 1}`}>
                  <div className="date">{i + 1}</div>
                  <input
                    type="number"
                    min="0"
                    value={minutes[i]}
                    onChange={(e) => updateMinutes(i + 1, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="summary">
        <div className="total-month">
          <p>Total Minutes This Month: {totalMonthMinutes}</p>
        </div>
        <div className="total-overall">
          <p>Total Minutes Overall: {totalOverallMinutes}</p>
        </div>
        <button onClick={resetMinutes}>Reset</button>
      </div>
    </div>
  );
};

export default CaclculateMinutes;

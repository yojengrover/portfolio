import React from 'react'
import { useState } from 'react';
import Header from '../Header/Header'
import './MyApp.css'

const MyApp = (props) => {
    

    const [inputDate, setInputDate] = useState('');
    const [totalMileage, setTotalMileage] = useState(0);
  
    const calculateMileage = () => {
      const startDate = new Date('2023-08-18');
      const inputDateObject = new Date(inputDate);
  
      if (!isNaN(inputDateObject.getTime())) {
        const daysDifference = Math.floor((inputDateObject - startDate) / (1000 * 60 * 60 * 24));
        const weeksPassed = Math.floor(daysDifference / 7);
        const mileage = weeksPassed * 250;
  
        setTotalMileage(mileage);
      } else {
        // Handle invalid date input
        console.error('Invalid date input');
      }
    };
  
    return (
      <div>
         <div><Header ns={4} /></div>
         <div className='container'>
        <label>
          Enter Date:
          <input type="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} />
        </label>
        <button onClick={calculateMileage}>Calculate Mileage</button>
        {totalMileage > 0 && <p>Total Mileage: {totalMileage} miles</p>}
      </div>
      </div>
    );
  
}

export default MyApp;
import React from 'react'
import { useState } from 'react';
import Header from '../Header/Header'
import './MyApp.css'

const MyApp = (props) => {
    

    const [inputDate, setInputDate] = useState('');
  const [dailyAverageMileage, setDailyAverageMileage] = useState(0);
  const [days, setDays] = useState(0);
  const calculateMileage = () => {
    const startDate = new Date('2023-08-18');
    const inputDateObject = new Date(inputDate);

    if (!isNaN(inputDateObject.getTime())) {
      const daysDifference = Math.floor((inputDateObject - startDate) / (1000 * 60 * 60 * 24));
      setDays(daysDifference);
      const totalMileageGoal = 12000;

      if (daysDifference >= 0) {
        const dailyAverageMileage = (totalMileageGoal /365) * daysDifference;
        setDailyAverageMileage(dailyAverageMileage);
      } else {
        // Handle dates before the start date
        console.error('Selected date is before the start date');
      }
    } else {
      // Handle invalid date input
      console.error('Invalid date input');
    }
  };

  return (
      <div><Header ns={4} />
         <div className='container'>
         <div className='datePicker'>
      <label>
        Enter Date:
        <input type="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} />
      </label>
      </div>
      <button onClick={calculateMileage}>Calculate Daily Average Mileage</button>
      {dailyAverageMileage > 0 && <p>Daily Average Mileage: {dailyAverageMileage.toFixed(2)} miles, Days: {days}</p>}
    </div>
    </div>
  );
};

export default MyApp;
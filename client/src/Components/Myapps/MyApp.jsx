import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import CaclculateMinutes from './CaclculateMinutes';
import ScheduleBuilder from './ScheduleBuilder';
import './MyApp.css';

const MyApp = (props) => {
  const [inputDate, setInputDate] = useState('');
  const [dailyAverageMileage, setDailyAverageMileage] = useState(0);
  const [days, setDays] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInC, setLoggedInC] = useState(false);
  const [loginInput, setLoginInput] = useState('');

  const handleLogin = () => {
    if (loginInput === '123') {
      setLoggedIn(true);
    }
    if (loginInput === '1235') {
      setLoggedInC(true);
    }
  };

  const calculateMileage = () => {
    const startDate = new Date('2023-08-18');
    const inputDateObject = new Date(inputDate);

    if (!isNaN(inputDateObject.getTime())) {
      const daysDifference = Math.floor((inputDateObject - startDate) / (1000 * 60 * 60 * 24));
      setDays(daysDifference);
      const totalMileageGoal = 12000;

      if (daysDifference >= 0) {
        const dailyAverageMileage = (totalMileageGoal / 365) * daysDifference;
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
    <div>
      <Header ns={4} />
      <div className='container'>
        {loggedIn ? (
          <div className='datePicker'>
            <label>
              Enter Date:
              <input type="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} />
            </label>
            <button onClick={calculateMileage}>Calculate</button>
            {dailyAverageMileage > 0 && <p>Daily Average Mileage: {dailyAverageMileage.toFixed(2)} miles, Days: {days}</p>}
          </div>
        ) : (loggedInC ? (<ScheduleBuilder/>):(
          <div className='loginField'>
            <label>
              Enter Login: <input type="password" value={loginInput} onChange={(e) => setLoginInput(e.target.value)} />
            </label>
            <button  onClick={handleLogin}>Login</button>
          </div>
        ))}
      </div>
      <Footer position={true}/>
    </div>
  );
};

export default MyApp;

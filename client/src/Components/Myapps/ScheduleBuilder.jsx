import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ScheduleBuilder.css';

const ScheduleBuilder = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hoursOfDay = Array.from({ length: 18 }, (_, index) => 7 + index);

  const createScheduleArray = () => {
    return Array.from({ length: hoursOfDay.length * 7 }, (_, index) => {
      const hourIndex = Math.floor(index / 7); // Determine the corresponding hour index
      const colIndex = index % 7; // Determine the column index within the day
  
      return {
        indexNumber: index,
        type: 'NA',
        description: '',
        color: 'grey',
        hour: hoursOfDay[hourIndex], // Include the hour information
        dayOfWeek: daysOfWeek[colIndex], // Include the day of the week information
      };
    });
  };

  const [yojenSchedule, setYojenSchedule] = useState(createScheduleArray());
  const [shivenSchedule, setShivenSchedule] = useState(createScheduleArray());
  const [selectedCellDescription, setSelectedCellDescription] = useState('');
  const [selectedCellIndex, setSelectedCellIndex] = useState(null);
  const [recID, setRecID] = useState(null);
  const descriptionInputRef = useRef();
  const selectChangedFromNA = useRef(false);

  const handleCellClick = (person, index) => {
    const schedule = person === 'Yojen' ? yojenSchedule : shivenSchedule;
    const selectedCell = schedule[index];

    setSelectedCellIndex(index);
    setSelectedCellDescription(selectedCell.description);

    // Focus on the description input
    if (descriptionInputRef.current && selectChangedFromNA.current) {
      descriptionInputRef.current.focus();
    }
    selectChangedFromNA.current = false;
  };

  useEffect(() => {
    // Fetch schedule data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/schedule');
        const scheduleData = response.data;
        console.log(scheduleData[0]);
        
        if (scheduleData && scheduleData.length === 1) {
          // Update Yojen's Schedule and Shiven's Schedule arrays with data from the server
          setRecID(scheduleData[0]._id)
          setYojenSchedule(scheduleData[0].yojenSchedule);
          setShivenSchedule(scheduleData[0].shivenSchedule);
        }
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSavetoDB = async () => {
    try {
      const response = await axios.post('http://localhost:8000/post/schedule', {

      yojenSchedule,
        shivenSchedule,
      });

      console.log('Schedule saved successfully:', response.data);
    } catch (error) {
        console.log(error);
      console.error('Error saving schedule:', error.message);
    }
  };

  const handleTypeChange = (person, index, newType) => {
    const schedule = person === 'Yojen' ? yojenSchedule : shivenSchedule;
    const setSchedule = person === 'Yojen' ? setYojenSchedule : setShivenSchedule;

    const updatedSchedule = [...schedule];
    const selectedCell = updatedSchedule[index];

    if (selectedCell.type === 'NA' && newType !== 'NA') {
      // Selection changed from 'NA', set the flag
      selectChangedFromNA.current = true;
    }

    selectedCell.type = newType;

    // Update color based on the selected type
    switch (newType) {
      case 'NA':
        selectedCell.color = 'grey';
        break;
      case 'class':
        selectedCell.color = 'red';
        break;
      case 'work':
        selectedCell.color = 'yellow';
        break;
      case 'free':
        selectedCell.color = 'green';
        break;
      default:
        break;
    }

    setSchedule(updatedSchedule);

    // Focus on the description input after changing the type
    if (descriptionInputRef.current && selectChangedFromNA.current) {
      descriptionInputRef.current.focus();
    }
  };

  const handleDescriptionChange = (e) => {
    setSelectedCellDescription(e.target.value);
  };

  const handleSaveClick = () => {
    if (selectedCellIndex !== null) {
      const updatedYojenSchedule = [...yojenSchedule];
      const updatedShivenSchedule = [...shivenSchedule];

      if (selectedCellIndex >= 0 && selectedCellIndex < 84) {
        updatedYojenSchedule[selectedCellIndex].description = selectedCellDescription;
        updatedShivenSchedule[selectedCellIndex].description = selectedCellDescription;
      }

      setYojenSchedule(updatedYojenSchedule);
      setShivenSchedule(updatedShivenSchedule);

      // Clear selection
      setSelectedCellIndex(null);
    }
  };

  useEffect(() => {
    // Focus on the description input when a cell is clicked
    if (descriptionInputRef.current) {
      descriptionInputRef.current.focus();
    }
  }, [selectedCellIndex]);

  return (
    <div className="schedule-container">
      <div className="description-container">
        <label><h4>Description: </h4></label>
        <input
         className='descriptionInput'
          type="text"
          value={selectedCellDescription}
          onChange={handleDescriptionChange}
          ref={descriptionInputRef}
          autoFocus={true}
        />
        <button className='saveButton' onClick={handleSaveClick}>Save</button>
      </div>
      <div className='mytables'>
        <div className="schedule">
          <h3>Yojen's Schedule</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                {daysOfWeek.map((day, index) => (
                  <th key={index}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hoursOfDay.map((hour) => (
                <tr key={hour}>
                  <td>{`${hour}:00`}</td>
                  {Array.from({ length: 7 }).map((_, colIndex) => {
                    const index = (hour - 7) * 7 + colIndex;
                    const cell = yojenSchedule[index];
                    return (
                      <td
                        key={colIndex}
                        onClick={() => handleCellClick('Yojen', index)}
                        style={{ backgroundColor: cell.color, outline: selectedCellIndex === index ? '2px solid #000' : 'none' }}
                      >
                        <select
                          value={cell.type}
                          onChange={(e) => handleTypeChange('Yojen', index, e.target.value)}
                          className="schedule-dropdown"
                        >
                          <option value="NA">NA</option>
                          <option value="class">Class</option>
                          <option value="work">Work</option>
                          <option value="free">Free</option>
                        </select>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="schedule">
          <h3>Shiven's Schedule</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                {daysOfWeek.map((day, index) => (
                  <th key={index}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hoursOfDay.map((hour) => (
                <tr key={hour}>
                  <td>{`${hour}:00`}</td>
                  {Array.from({ length: 7 }).map((_, colIndex) => {
                    const index = (hour - 7) * 7 + colIndex;
                    const cell = shivenSchedule[index];
                    return (
                      <td
                        key={colIndex}
                        onClick={() => handleCellClick('Shiven', index)}
                        style={{ backgroundColor: cell.color, outline: selectedCellIndex === index ? '2px solid #000' : 'none' }}
                      >
                        <select
                          value={cell.type}
                          onChange={(e) => handleTypeChange('Shiven', index, e.target.value)}
                          className="schedule-dropdown"
                        >
                          <option value="NA">NA</option>
                          <option value="class">Class</option>
                          <option value="work">Work</option>
                          <option value="free">Free</option>
                        </select>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={handleSavetoDB}>save To DB</button>
    </div>
  );
};

export default ScheduleBuilder;

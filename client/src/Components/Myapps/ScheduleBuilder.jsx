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
  
    const findCommonFreeCells = () => {
        return yojenSchedule.map((yojenCell, index) => {
          const shivenCell = shivenSchedule[index];
      
          // Check if both yojenCell and shivenCell exist at the specified index
          // Also, ensure that the type is 'free' for both cells
          const isCommonFreeCell = yojenCell && shivenCell && yojenCell.type === 'free' && shivenCell.type === 'free';
      
          // Return the common cell or an empty cell if not common
          return isCommonFreeCell
            ? {
                indexNumber: index,
                type: 'free',
                description: '', // Add description or any other properties if needed
                color: 'green', // Add color or any other properties if needed
                hour: yojenCell.hour, // Include the hour information
                dayOfWeek: yojenCell.dayOfWeek, // Include the day of the week information
              }
            : {
                indexNumber: index,
                type: 'NA',
                description: '',
                color: 'grey',
                hour: yojenCell.hour,
                dayOfWeek: yojenCell.dayOfWeek,
              };
        });
      };
  
    const [yojenSchedule, setYojenSchedule] = useState(createScheduleArray());
    const [shivenSchedule, setShivenSchedule] = useState(createScheduleArray());
    const [commonFreeCells, setCommonFreeCells] = useState([]);
  
    const createCommonArray = () => {
      return Array.from({ length: hoursOfDay.length * 7 }, (_, index) => {
        const hourIndex = Math.floor(index / 7); // Determine the corresponding hour index
        const colIndex = index % 7; // Determine the column index within the day
        const cell = commonFreeCells[index] || { type: 'NA' }; // Use common 'free' cell or 'NA' if not available
        console.log("common "+cell.indexNumber);
        return {
          indexNumber: index,
          type: cell.type,
          description: cell.description,
          color: cell.color,
          hour: hoursOfDay[hourIndex],
          dayOfWeek: daysOfWeek[colIndex],
        };
      });
    };
  
    const [commonSchedule, setCommonSchedule] = useState(createCommonArray());
    const [selectedCellDescription, setSelectedCellDescription] = useState('');
    const [selectedCellIndex, setSelectedCellIndex] = useState(null);
    const [istable, setTable] = useState(false);
    const descriptionInputRef = useRef();
    const selectChangedFromNA = useRef(false);
    const [isDataSaved, setDataSaved] = useState(false);
  
    const handleTable = () => {
      setTable(!istable);
    };


  const handleCellClick = (person, index) => {
    const schedule = person === 'Yojen' ? yojenSchedule : shivenSchedule;
    const selectedCell = schedule[index];

    setSelectedCellIndex(index);
    setSelectedCellDescription(selectedCell.description);

    // Focus on the description input
  };

  

  // Function to generate a schedule table based on common 'free' cells
  const generateCommonFreeTable = () => {
    let ab = findCommonFreeCells();
    setCommonFreeCells(ab);
    handleTable();
}



  useEffect(() => {
    // Fetch schedule data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/schedule');
        const scheduleData = response.data;
        if (scheduleData && scheduleData.length === 1) {
          // Update Yojen's Schedule and Shiven's Schedule arrays with data from the server
          
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

      // Set the state to trigger the animation
      setDataSaved(true);

      // Reset the state after 2 seconds to stop the animation
      setTimeout(() => {
        setDataSaved(false);
      }, 2000);
    } catch (error) {
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

  const [isDescriptionEnabled, setDescriptionEnabled] = useState(true);

  // ... (existing code)

  const handleEnableDescription = () => {
    setDescriptionEnabled(true);
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

      // Clear selection and disable description input if description is not null
      setSelectedCellIndex(null);
      if (selectedCellDescription !== null) {
        setDescriptionEnabled(false);
      }
    }
  };


  return (
    <div className={`schedule-container${isDataSaved ? ' data-saved' : ''}`}>
   { !istable? (<div className='scheduleTables'>
      <div className="description-container">
        <label><h4>Description: </h4></label>
        <input
         className='descriptionInput'
          type="text"
          value={selectedCellDescription}
          onChange={handleDescriptionChange}
          ref={descriptionInputRef}
          disabled={selectedCellDescription !== null && !isDescriptionEnabled}
            />
            {selectedCellDescription !== null && !isDescriptionEnabled && (
              <button className='saveButton' onClick={handleEnableDescription}>
                Enable
              </button>
            )}
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
      <button className='saveButton' onClick={handleSavetoDB}>save To DB</button>
      <button className='saveButton' onClick={generateCommonFreeTable}>Generate Schedule Table</button>
      </div>):(
      <div className=''>
        <button className='saveButton' onClick={handleTable}>Back</button>
        <div className="schedule">
          <h3>Common Free Schedule</h3>
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
                    const cell = commonFreeCells[index];
                    return (
                      <td
                        key={colIndex}
                        onClick={() => handleCellClick('Common', index)}
                        style={{ backgroundColor: cell.color, outline: selectedCellIndex === index ? '2px solid #000' : 'none' }}
                      >
                        <select
                          value={cell.type}
                          onChange={(e) => handleTypeChange('Common', index, e.target.value)}
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
      </div>)}
    </div>
  );
};

export default ScheduleBuilder;

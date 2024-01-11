

import React, { useState } from 'react';
import './ScheduleBuilder.css';

const ScheduleBuilder = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hoursOfDay = Array.from({ length: 12 }, (_, index) => 7 + index);

  const [schedulesYojen, setSchedulesYojen] = useState(Array.from({ length: 7 }, () => Array(12).fill({ text: '', color: 'grey' })));
  const [schedulesShiven, setSchedulesShiven] = useState(Array.from({ length: 7 }, () => Array(12).fill({ text: '', color: 'grey' })));

  const [selectedCellsYojen, setSelectedCellsYojen] = useState([]);
  const [selectedCellsShiven, setSelectedCellsShiven] = useState([]);

  const [selectedOptionYojen, setSelectedOptionYojen] = useState('Class Work');
  const [selectedOptionShiven, setSelectedOptionShiven] = useState('Class Work');

  const updateSchedule = (dayIndex, hourIndex, person, value, color) => {
    const newSchedules = person === 'Yojen' ? [...schedulesYojen] : [...schedulesShiven];
    newSchedules[dayIndex][hourIndex] = { text: value, color };
    person === 'Yojen' ? setSchedulesYojen(newSchedules) : setSchedulesShiven(newSchedules);
  };

  const handleSelection = (dayIndex, person) => {
    const selectedCells = person === 'Yojen' ? selectedCellsYojen : selectedCellsShiven;

    if (selectedCells.length === 0) {
      selectedCells.push({ day: dayIndex, hour: null });
    } else if (selectedCells.length === 1) {
      if (selectedCells[0].day === dayIndex) {
        // If selecting the same day, toggle the selection
        selectedCells.pop();
      } else {
        // If selecting a different day, update the hour index
        selectedCells[0].hour = dayIndex;
      }
    }

    person === 'Yojen' ? setSelectedCellsYojen([...selectedCells]) : setSelectedCellsShiven([...selectedCells]);
  };

  const handleOptionChange = (person, option) => {
    person === 'Yojen' ? setSelectedOptionYojen(option) : setSelectedOptionShiven(option);
  };

  return (
    <div className="schedule-builder-container">
      <div className="schedule-table">
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
                {daysOfWeek.map((day, dayIndex) => (
                  <td
                    key={`${day}-${hour}`}
                    onClick={() => handleSelection(dayIndex, 'Yojen')}
                    className={selectedCellsYojen.some((cell) => cell.day === dayIndex) ? 'selected' : ''}
                    style={{ backgroundColor: schedulesYojen[dayIndex][hour - 7].color }}
                  >
                    <select
                      value={selectedOptionYojen}
                      onChange={(e) => {
                        handleOptionChange('Yojen', e.target.value);
                        const color =
                          e.target.value === 'Class Work' ? 'red' : e.target.value === 'Family' ? 'yellow' : 'green';
                        updateSchedule(dayIndex, hour - 7, 'Yojen', '', color);
                      }}
                      className="schedule-dropdown"
                    >
                      <option value="Class Work">Class Work</option>
                      <option value="Family">Family</option>
                      <option value="Free Time">Free Time</option>
                    </select>
                    <input
                      type="text"
                      value={schedulesYojen[dayIndex][hour - 7].text}
                      onChange={(e) => updateSchedule(dayIndex, hour - 7, 'Yojen', e.target.value, '')}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="schedule-table">
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
                {daysOfWeek.map((day, dayIndex) => (
                  <td
                    key={`${day}-${hour}`}
                    onClick={() => handleSelection(dayIndex, 'Shiven')}
                    className={selectedCellsShiven.some((cell) => cell.day === dayIndex) ? 'selected' : ''}
                    style={{ backgroundColor: schedulesShiven[dayIndex][hour - 7].color }}
                  >
                    <select
                      value={selectedOptionShiven}
                      onChange={(e) => {
                        handleOptionChange('Shiven', e.target.value);
                        const color =
                          e.target.value === 'Class Work' ? 'red' : e.target.value === 'Family' ? 'yellow' : 'green';
                        updateSchedule(dayIndex, hour - 7, 'Shiven', '', color);
                      }}
                      className="schedule-dropdown"
                    >
                      <option value="Class Work">Class Work</option>
                      <option value="Family">Family</option>
                      <option value="Free Time">Free Time</option>
                    </select>
                    <input
                      type="text"
                      value={schedulesShiven[dayIndex][hour - 7].text}
                      onChange={(e) => updateSchedule(dayIndex, hour - 7, 'Shiven', e.target.value, '')}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleBuilder;

import React, { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';
import styled from 'styled-components';
import './styles.css';
import 'react-day-picker/lib/style.css';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  .button {
    border: 0.5px solid #e0e0e0;
    padding: 4px;
    border-radius: 4px;
    width: 200px;
  }
  .picker-window {
    position: absolute;
    top: 40px;
    border: 1px solid black;
    /* position: relative;
    top: 100px;
    left: -150px; */
  }
`;

export default function App() {
  // const [range, setRange] = useState({
  //   from: moment(Date.now()).subtract(10, 'days'),
  //   to: moment(Date.now()),
  // });
  const [range, setRange] = useState({
    from: undefined,
    to: undefined,
  });
  const [datePickerOpen, toggleDatePicker] = useState(false);
  const modifiers = { start: range.from, end: range.to };
  const handleDayClick = day => {
    console.log({ day });
    const derivedRange = DateUtils.addDayToRange(day, range);
    console.log({ derivedRange });
    setRange(derivedRange);
  };
  return (
    <div className="App">
      <Container>
        <button
          type="button"
          className="button"
          onClick={() => toggleDatePicker(!datePickerOpen)}
        >
          {range.from === undefined || range.to === undefined
            ? 'Select Dates'
            : `${moment(range.from).format('DD MMM, YY')} -
        ${moment(range.to).format('DD MMM, YY')}`}
        </button>
        {datePickerOpen && (
          <DayPicker
            className="Selectable picker-window"
            numberOfMonths={2}
            selectedDays={[range.from, { from: range.from, to: range.to }]}
            modifiers={modifiers}
            onDayClick={handleDayClick}
          />
        )}
      </Container>
    </div>
  );
}

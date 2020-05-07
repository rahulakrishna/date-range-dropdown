import React, { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';
import styled from 'styled-components';
import './styles.css';
import 'react-day-picker/lib/style.css';

const Container = styled.div`
  position: relative;
  .button {
  }
  .picker-window {
    position: relative;
    top: 100px;
    left: -150px;
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
  const [datePickerOpen, toggleDatePicker] = useState(true);
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
          className="btn btn-dark button"
          onClick={() => toggleDatePicker(!datePickerOpen)}
        >
          {range.from === undefined || range.to === undefined
            ? 'Select Dates'
            : `${moment(range.from).format('DD-MM-YY')} -
        ${moment(range.to).format('DD-MM-YY')}`}
        </button>
        {datePickerOpen && (
          <DayPicker
            className="Selectable picker-window"
            numberOfMonths={1}
            selectedDays={[range.from, { from: range.from, to: range.to }]}
            modifiers={modifiers}
            onDayClick={handleDayClick}
          />
        )}
      </Container>
    </div>
  );
}

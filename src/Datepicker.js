import React, { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';
import styled from 'styled-components';
import './styles.css';
import 'react-day-picker/lib/style.css';

const NavbarContainer = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 10px;
  padding-left: 10px;
  button {
    border: none;
    background: none;
    color: #4866ff;
    font-weight: 700;
  }
`;

// The navbar portion consists of the Previous and Next icon
const DatepickerNavbar = ({ onPreviousClick, onNextClick, setCancelBlur }) => {
  return (
    <NavbarContainer>
      <button
        className="material-icons"
        onMouseDown={() => {
          setCancelBlur(true);
        }}
        onMouseUp={() => {
          onPreviousClick();
          setCancelBlur(false);
        }}
      >
        chevron_left
      </button>
      <button
        className="material-icons"
        onMouseDown={() => {
          setCancelBlur(true);
        }}
        onMouseUp={() => {
          onNextClick();
          setCancelBlur(false);
        }}
      >
        chevron_right
      </button>
    </NavbarContainer>
  );
};

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
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 12px;
    &:focus {
      outline: none;
    }
    .DayPicker-wrapper {
      &:focus {
        outline: none;
      }
    }
    .DayPicker-Months {
      flex-wrap: nowrap;
    }
    .DayPicker-Day--selected {
      background: #ecefff;
      color: #000;
      border-radius: 0px;
    }
    .DayPicker-NavButton--prev {
      right: auto;
      left: 1em;
      background: none;
    }
    .DayPicker-Caption {
      text-align: center;
      div {
        font-weight: bold;
        font-weight: 12px;
      }
    }
    .DayPicker-Month {
      border-collapse: separate;
      border-spacing: 0px 2px;
    }
    .DayPicker-Week {
      font-weight: bold;
      .DayPicker-Day {
        padding-top: 1px;
        padding-bottom: 1px;
        padding-right: 2px;
        padding-left: 2px;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        &:focus {
          outline: none;
        }
        &:active {
          outline: none;
        }
      }
      .DayPicker-Day--selected {
        border-bottom: 1px solid #b5bcff;
        border-top: 1px solid #b5bcff;
        &:focus {
          outline: none;
        }
        &:first-child {
          border-left: 1px solid #b5bcff;
          border-radius: 6px 0px 0px 6px;
        }
        &:last-child {
          border-right: 1px solid #b5bcff;
          border-radius: 0px 6px 6px 0px;
        }
      }
      .DayPicker-Day--start {
        border-left: 1px solid #b5bcff;
        border-radius: 6px 0px 0px 6px;
      }
      .DayPicker-Day--end {
        border-right: 1px solid #b5bcff;
        border-radius: 0px 6px 6px 0px;
      }
      .DayPicker-Day--outside {
        border: none !important;
        background: none !important;
      }
    }
  }
`;

export default function App() {
  const [cancelBlur, setCancelBlur] = useState(false);
  const [range, setRange] = useState({
    from: undefined,
    to: undefined,
  });
  const [datePickerOpen, toggleDatePicker] = useState(false);
  const modifiers = { start: range.from, end: range.to };
  const handleDayClick = day => {
    const derivedRange = DateUtils.addDayToRange(day, range);
    setRange(derivedRange);
  };
  return (
    <div className="App">
      <Container
        onBlur={() => {
          if (!cancelBlur) {
            toggleDatePicker(false);
          }
        }}
      >
        <button
          type="button"
          className="button"
          onClick={() => toggleDatePicker(!datePickerOpen)}
          onMouseDown={e => e.stopPropagation()}
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
            onDayMouseDown={() => {
              setCancelBlur(true);
            }}
            onDayMouseUp={() => {
              setCancelBlur(false);
            }}
            navbarElement={props => (
              <DatepickerNavbar setCancelBlur={setCancelBlur} {...props} />
            )}
            showOutsideDays={false}
          />
        )}
      </Container>
    </div>
  );
}

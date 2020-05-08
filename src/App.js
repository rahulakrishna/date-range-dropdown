import React from 'react';
import styled from 'styled-components';
import Datepicker from './Datepicker';

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  .brother {
    padding: 4px;
    margin-right: 4px;
    color: #f0f0f0;
    background: #0f0f0f;
    border-radius: 4px;
  }
`;

const App = () => {
  return (
    <Navbar>
      <div className="brother">Hello</div>
      <Datepicker />
    </Navbar>
  );
};

export default App;

// Package dependencies
import React from 'react';
import styled from 'styled-components';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Reflect(props) {
  const { num, setText } = props;

  function handleClick() {
    setText({ num, type: 'reflect' });
  }

  return (
    <Container onClick={handleClick}>
      <Text>Reflect</Text>
    </Container>
  );
}

// Styling
const Container = styled.div`
  margin: 5px;
  cursor: pointer;
`;

const Text = styled.div`
  
`;

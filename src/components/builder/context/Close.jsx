// Package dependencies
import React from 'react';
import styled from 'styled-components';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Selection(props) {
  const { setMenu } = props;

  return (
    <Container onClick={() => { setMenu({}); }}>
      X
    </Container>
  );
}

// Styling
const Container = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  color: red;
`;

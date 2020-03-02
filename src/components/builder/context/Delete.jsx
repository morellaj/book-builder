// Package dependencies
import React from 'react';
import styled from 'styled-components';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Selection(props) {
  const { num, setText } = props;

  return (
    <Container onDoubleClick={() => { setText({ num, type: 'delete' }); }}>
      <Text>Delete</Text>
    </Container>
  );
}

// Styling
const Container = styled.div`
  display: flex;
  margin: 5px;
  color: red;
  cursor: pointer;
`;

const Text = styled.div`
  
`;

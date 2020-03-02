// Package dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Rotate(props) {
  const [value, setValue] = useState('0');
  const { num, setText, rotate } = props;

  useEffect(() => {
    if (num) {
      setText({ num, type: 'rotate', value });
    }
  }, [value]);

  useEffect(() => {
    if (num) {
      setValue(rotate);
    }
  }, [rotate]);

  return (
    <Container>
      <Text>Rotate</Text>
      <RotateContainer>
        <Button onClick={() => setValue(String(parseInt(value) - 10))}>{'<--'}</Button>
        <RotateValue value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={() => setValue(String(parseInt(value) + 10))}>{'-->'}</Button>
      </RotateContainer>
    </Container>
  );
}

// Styling
const Container = styled.div`
  display: flex;
  margin: 5px;
`;

const Text = styled.div`
  
`;

const RotateContainer = styled.div`
  display: flex
`;

const Button = styled.div`
  cursor: pointer;
  padding: 5px;
`;

const RotateValue = styled(Textarea)`
  width: 50px;
`;

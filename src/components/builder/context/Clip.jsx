// Package dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Selection(props) {
  const [xValue, setXValue] = useState('0');
  const [yValue, setYValue] = useState('0');
  const { num, setText } = props;

  useEffect(() => {
    if (num) {
      setText({ num, type: 'clip', xValue, yValue });
    }
  }, [xValue, yValue]);

  return (
    <Container>
      <Text>Clip</Text>
      <ClipContainer>
        <Button onClick={() => setXValue(String(parseInt(xValue) - 10))}>{'<--'}</Button>
        <RotateValue value={xValue} onChange={(e) => setXValue(e.target.value)} />
        <Button onClick={() => setXValue(String(parseInt(xValue) + 10))}>{'-->'}</Button>
      </ClipContainer>
      <ClipContainer>
        <Button onClick={() => setYValue(String(parseInt(yValue) - 10))}>{'<--'}</Button>
        <RotateValue value={yValue} onChange={(e) => setYValue(e.target.value)} />
        <Button onClick={() => setYValue(String(parseInt(yValue) + 10))}>{'-->'}</Button>
      </ClipContainer>
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

const ClipContainer = styled.div`
  display: flex
`;

const Button = styled.div`
  cursor: pointer;
  padding: 5px;
`;

const RotateValue = styled(Textarea)`
  width: 50px;
`;

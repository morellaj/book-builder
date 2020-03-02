// Package dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Reflect from './Reflect';
import Rotate from './Rotate';
import Clip from './Clip';
import Delete from './Delete';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function RightClickMenu(props) {
  const [show, setShow] = useState(false);
  const { menu: { num, image, x, y }, setText } = props;

  const { rotate, character } = image || {};

  useEffect(() => {
    if (character) {
      setShow(true);
    }
  }, [image]);

  return (
    <Container show={show} x={x} y={y}>
      <Reflect num={num} setText={setText} />
      <Rotate num={num} setText={setText} rotate={rotate} />
      <Clip num={num} setText={setText} />
      <Delete num={num} setText={setText} />
    </Container>
  );
}

// Styling
const Container = styled.div`
  position: absolute;
  background-color: white;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  top: ${(props) => props.y};
  left: ${(props) => props.x};
  padding: 5px;
`;

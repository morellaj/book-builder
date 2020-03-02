// Package dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Reflect from './Reflect';
import Rotate from './Rotate';
import Clip from './Clip';
import Delete from './Delete';
import Close from './Close';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function RightClickMenu(props) {
  const [show, setShow] = useState(false);
  const { menu: { num, image, x, y }, setMenu, setText } = props;

  const { rotate, character, item } = image || {};

  useEffect(() => {
    if (character || item) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [image]);

  return (
    <Container show={show} x={x} y={y}>
      <Close setMenu={setMenu} />
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

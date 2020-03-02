/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled from 'styled-components';
import { bubbleFontSizes } from 'Constants';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Line(props) {
  const { details: { scale, value, image: { line, size, bottom, left, width } } } = props;
  const style = {
    left: scale * left || 100,
    bottom: scale * bottom || 100,
    width: scale * width || 0,
    fontSize: bubbleFontSizes[size] || size || bubbleFontSizes.standard,
  };

  return (
    <Container id="line" style={style} value={value} data-drag draggable="true">
      <Text>
        {line}
      </Text>
    </Container>
  );
}


// Styling
const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div``;

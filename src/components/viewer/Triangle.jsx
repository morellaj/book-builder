/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled from 'styled-components';
import {
  triangleWidth,
  triangleHeight,
} from 'Constants';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function SpeechTriangle(props) {
  const {
    scale, id, style, handleDragStart, handleDragEnd, value,
  } = props;
  const triangleStyle = style;
  triangleStyle.height = scale * triangleWidth;
  triangleStyle.width = scale * triangleWidth;
  return (
    <TriangleContainer
      id={id}
      style={triangleStyle}
    >
      <Triangle
        style={{
          borderLeftWidth: scale * (triangleWidth / 2),
          borderRightWidth: scale * (triangleWidth / 2),
          borderTopWidth: scale * triangleHeight,
        }}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        value={value}
      />
    </TriangleContainer>
  );
}


// Styling
const TriangleContainer = styled.div`
  position: absolute;
`;

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left-style: solid;
  border-right-style: solid;
  border-top-style: solid;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: white;
  border-top-color: ${(props) => (props.theme.backgroundColor)};
`;

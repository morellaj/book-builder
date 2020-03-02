/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled from 'styled-components';
import { defaultHeight, defaultWidth } from 'Constants';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Item(props) {
  const { details: { scale, image: { background, reflect } } } = props;

  const transform = reflect ? 'scaleX(-1)' : 'scaleX(1)';

  const style = {
    height: scale * defaultHeight,
    width: scale * defaultWidth,
    transform,
  };

  const src = background || 'none';
  return (
    <Container src={`Assets/backgrounds/${src}.png`} style={style} />
  );
}

// Styling
const Container = styled.img`
  position: absolute
`;

/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled from 'styled-components';

import { items } from 'Data/imageData';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Item(props) {
  const {
    scale, image, value,
  } = props;
  const {
    item, bottom, left, reflect,
  } = image;

  const transform = reflect ? 'scaleX(-1)' : 'scaleX(1)';


  const style = {
    height: scale * items[item].height,
    bottom: scale * (bottom - items[item].height / 2) || 0,
    left: scale * (left - items[item].width / 2) || 0,
    transform,
  };
  if (items[item].width) {
    style.width = scale * items[item].width;
  }


  return (
    <Container
      src={`Assets/${item}.png`}
      style={style}
      value={value}
      data-drag
    />
  );
}


// Styling
const Container = styled.img`
  position: absolute
`;

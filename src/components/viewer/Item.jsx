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
    scale, image, value, noDrag,
  } = props;
  const {
    item, bottom, left, reflect,
  } = image;

  const transform = reflect ? 'scaleX(-1)' : 'scaleX(1)';
  const drag = !noDrag;

  const it = items[item];
  const height = it ? it.height : 0;
  const width = it ? it.width : 0;
  const style = {
    height: scale * height,
    bottom: scale * (bottom - height / 2) || 0,
    left: scale * (left - width / 2) || 0,
    transform,
  };
  if (width !== 0) {
    style.width = scale * it.width;
  }


  return (
    <Container
      src={`Assets/items/${item}.png`}
      style={style}
      value={value}
      data-drag={drag}
    />
  );
}


// Styling
const Container = styled.img`
  position: absolute
`;

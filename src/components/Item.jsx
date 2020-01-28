/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled from 'styled-components';

import { items } from 'Data/imageData';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Item(props) {
  const { scale, image } = props;
  const {
    item, bottom, left, reflect,
  } = image;


  const transform = reflect ? 'scaleX(-1)' : 'scaleX(1)';

  const style = {
    height: scale * items[item].height,
    width: scale * items[item].width,
    bottom: scale * (bottom - items[item].height / 2) || 0,
    left: scale * (left - items[item].width / 2) || 0,
    transform,
  };

  return (
    <Container src={`Assets/${item}.png`} style={style} />
  );
}


// Styling
const Container = styled.img`
  position: absolute
`;

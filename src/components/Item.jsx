/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled from 'styled-components';

import { images } from 'Data/imageData';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Prop(props) {
  const { scale, image } = props;
  const {
    img, bottom, left, reflect,
  } = image;

  const transform = reflect ? 'scaleX(-1)' : 'scaleX(1)';

  const style = {
    height: scale * images[img].height,
    width: scale * images[img].width,
    bottom: scale * bottom,
    left: scale * left,
    transform,
  };

  return (
    <Container src={`Assets/${img}.png`} style={style} />
  );
}


// Styling
const Container = styled.img`
  position: absolute
`;

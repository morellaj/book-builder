/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled from 'styled-components';

import { characters } from 'Data/imageData';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Character(props) {
  const { scale, image } = props;
  const {
    character, bottom, left, reflect,
  } = image;

  const transform = reflect ? 'scaleX(-1)' : 'scaleX(1)';

  const style = {
    height: scale * characters[character].height,
    width: scale * characters[character].width,
    bottom: scale * (bottom - characters[character].height / 2),
    left: scale * (left - characters[character].width / 2),
    transform,
  };

  return (
    <Container id="character" src={`Assets/${character}.png`} style={style} />
  );
}


// Styling
const Container = styled.img`
  position: absolute
`;

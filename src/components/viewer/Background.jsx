/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled from 'styled-components';
import { defaultHeight, defaultWidth } from 'Constants';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Item(props) {
  const { scale, image: { background } } = props;

  const style = {
    height: scale * defaultHeight,
    width: scale * defaultWidth,
  };

  return (
    <Container src={`Assets/backgrounds/${background}.png`} style={style} />
  );
}

// Styling
const Container = styled.img`
  position: absolute
`;

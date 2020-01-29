/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled from 'styled-components';
import { characters } from 'Data/imageData';
import Item from './Item';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Character(props) {
  const { scale, image } = props;
  const {
    character, bottom, left, reflect, items,
  } = image;

  let attachments;
  if (items) {
    attachments = items.map((x) => <Item scale={scale} image={x} key={x.item} />);
  }

  const transform = reflect ? 'scaleX(-1)' : 'scaleX(1)';
  const pose = characters[character.split('-')[0]];


  const style = {
    height: scale * pose.height,
    width: scale * pose.width,
    bottom: scale * (bottom - pose.height / 2),
    left: scale * (left - pose.width / 2),
    transform,
  };

  return (
    <Container id="character" style={style}>
      <img alt="kate" src={`Assets/characters/${character}.png`} />
      {attachments}
    </Container>
  );
}


// Styling
const Container = styled.div`
  position: absolute
`;

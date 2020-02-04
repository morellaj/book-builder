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
  const {
    scale, image, value,
  } = props;
  const {
    character, bottom, left, reflect, items,
  } = image;

  let attachments;
  if (items) {
    attachments = items.map((x) => <Item scale={scale} image={x} key={x.item} noDrag />);
  }

  const transform = reflect ? 'scaleX(-1)' : 'scaleX(1)';


  const pose = characters[character.split('-')[0]];
  const height = pose ? pose.height : 0;
  const width = pose ? pose.width : 0;


  const style = {
    height: scale * height,
    width: scale * width,
    bottom: scale * (bottom - height / 2),
    left: scale * (left - width / 2),
    transform,
  };

  return (
    <Container id="character" style={style} value={value} data-drag>
      <Image alt="kate" src={`Assets/characters/${character}.png`} value={value} data-drag />
      {attachments}
    </Container>
  );
}


// Styling
const Container = styled.div`
  position: absolute
`;

const Image = styled.img`
  width: 100%;
`;

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
  const { details: { scale, value, image: { character, bottom, left, reflect, rotate, clip, items } } } = props;


  let attachments;
  if (items) {
    attachments = items.map(
      (x, i) => {
        const details = { scale, image: x, value: `item-${value}-${i}` };
        return <Item details={details} key={x.item} data-drag />;
      },
    );
  }


  const pose = character ? characters[character.split('-')[0]] : null;
  const height = pose ? pose.height : 0;
  const width = pose ? pose.width : 0;

  let transform = reflect ? 'scaleX(-1)' : 'scaleX(1)';
  if (rotate) {
    transform += ` rotate(${rotate}deg)`;
  }

  let clipStyle;
  if (clip) {
    if (clip.length === 4) {
      clipStyle = `rect(${clip[0]}px, ${clip[1]}px, ${clip[2]}px, ${clip[3]}px, )`;
    } else if (clip.length === 2) {
      const x = parseInt(clip[0]);
      const y = parseInt(clip[1]);
      const y1 = y < 0 ? -scale * y : 0;
      const x1 = x > 0 ? scale * (width - x) : scale * width;
      const y2 = y > 0 ? scale * (height - y) : scale * height;
      const x2 = x < 0 ? -scale * x : 0;
      clipStyle = `rect(${y1}px, ${x1}px, ${y2}px, ${x2}px)`;
    }
  }

  const style = {
    height: scale * height,
    width: scale * width,
    bottom: scale * (bottom - height / 2) || 0,
    left: scale * (left - width / 2) || 0,
    clip: clipStyle,
    transform,
  };

  return (
    <Container id="character" style={style} value={value} data-drag>
      <Image alt={character} src={`Assets/characters/${character}.png`} value={value} data-drag />
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

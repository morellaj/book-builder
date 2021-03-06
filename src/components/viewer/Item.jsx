/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled from 'styled-components';

import { items } from 'Data/imageData';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Item(props) {
  const { details: { scale, value, image: { item, bottom, left, rotate, clip, reflect } } } = props;


  let transform = reflect ? 'scaleX(-1)' : 'scaleX(1)';
  if (rotate) {
    transform += ` rotate(${rotate}deg)`;
  }

  const { height, width } = items[item] || { height: 0, width: 0 };


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
    bottom: scale * (bottom - height / 2) || 0,
    left: scale * (left - width / 2) || 0,
    clip: clipStyle,
    transform,
  };
  if (width !== 0) {
    style.width = scale * width;
  }


  return (
    <Container
      src={`Assets/items/${item}.png`}
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

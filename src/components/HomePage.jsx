/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { scenes } from 'Data/book1';
import { bookDimensions } from 'Constants';
import Item from './Item';
import Character from './Character';
import Speech from './Speech';

const { defaultHeight, defaultWidth } = bookDimensions;


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Home() {
  const [scale, setScale] = useState(1);
  const [page, setPage] = useState(2);
  const [hover, setHover] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const scene = scenes[page].map((item) => {
    let temp;
    if (item.character) {
      temp = <Character scale={scale} image={item} />;
    } else if (item.item) {
      temp = <Item scale={scale} image={item} />;
    } else if (item.text) {
      temp = <Speech scale={scale} speech={item} />;
    }
    return temp;
  });


  function handleResize() {
    if (window.innerWidth / window.innerHeight <= defaultWidth / defaultHeight) {
      setScale(window.innerWidth / defaultWidth);
    } else {
      setScale(window.innerHeight / defaultHeight);
    }
  }

  function handleMouseMove(e) {
    setHover(true);
    setX(e.clientX);
    setY(e.clientY);
  }

  function arrowClick(e) {
    if (e.target.getAttribute('value') === 'forward') {
      if (page < scenes.length - 1) {
        setPage(page + 1);
      }
    } else if (page >= 1) {
      setPage(page - 1);
    }
  }

  function handleMouseOut() {
    setHover(false);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    handleResize();
  }, []);


  return (
    <Container>
      <BookContainer scale={scale} onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
        <MousePosition hover={hover}>
          {`x: ${(x / scale).toFixed(0)}`}
          {'   '}
          {`y: ${(540 - (y / scale)).toFixed(0)}`}
        </MousePosition>
        {scene}
        <SlideArrow src="../../assets/right-arrow.png" scale={scale} value="forward" onClick={arrowClick} />
        <SlideArrow src="../../assets/left-arrow.png" scale={scale} value="back" onClick={arrowClick} />
      </BookContainer>
    </Container>
  );
}


// Styling
const Container = styled.div`
  
`;

const BookContainer = styled.div`
  background-color: white;
  width: ${(props) => `${defaultHeight * props.scale}px`};
  height: ${(props) => `${defaultWidth * props.scale}px`};
  position: relative;
`;

const MousePosition = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5
`;

const SlideArrow = styled.img`
  position: absolute;
  z-index: 10;
  width: ${(props) => `${80.4 * props.scale}px`};
  height: ${(props) => `${80.4 * props.scale}px`};
  bottom: ${(props) => `${0 * props.scale}px`};
  left: ${(props) => (props.value === 'forward' ? `${870 * props.scale}px` : `${0 * props.scale}px`)};
  cursor: pointer;
`;

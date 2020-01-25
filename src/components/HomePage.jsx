/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const character = {
  'kate-house': {
    height: 540,
    width: 960,
  },
  kate: {
    height: 146,
    width: 90.7,
  },
  pencil: {
    height: 29.5,
    width: 29.5,
  },
  book: {
    height: 37.4,
    width: 41,
  },
  'green-backpack': {
    height: 46.8,
    width: 43.2,
  },
  table: {
    height: 98.6,
    width: 237.7,
  },
};

const scenes = [
  [
    { img: 'kate-house', left: 0, bottom: 0 },
    { img: 'kate', left: 801, bottom: 30 },
    { img: 'table', left: 91, bottom: 33 },
    { img: 'green-backpack', left: 130, bottom: 118 },
    { img: 'book', left: 188, bottom: 110 },
    { img: 'pencil', left: 253, bottom: 105 },
  ],
  [
    { img: 'kate-house', left: 0, bottom: 0 },
    { img: 'kate', left: 701, bottom: 30 },
    { img: 'table', left: 91, bottom: 33 },
    { img: 'green-backpack', left: 130, bottom: 118 },
    { img: 'book', left: 188, bottom: 110 },
    { img: 'pencil', left: 253, bottom: 105 },
  ],
  [
    { img: 'kate-house', left: 0, bottom: 0 },
    { img: 'kate', left: 601, bottom: 30 },
    { img: 'table', left: 91, bottom: 33 },
    { img: 'green-backpack', left: 130, bottom: 118 },
    { img: 'book', left: 188, bottom: 110 },
    { img: 'pencil', left: 253, bottom: 105 },
  ],
];


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Home() {
  const [scale, setScale] = useState(1);
  const [page, setPage] = useState(0);
  const [hover, setHover] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const images = scenes[page].map((item) => {
    const style = {
      height: scale * character[item.img].height,
      width: scale * character[item.img].width,
      bottom: scale * item.bottom,
      left: scale * item.left,
    };
    return <Image src={`../../assets/${item.img}.png`} style={style} />;
  });


  function handleResize() {
    if (window.innerWidth / window.innerHeight <= 16 / 9) {
      setScale(window.innerWidth / 960);
    } else {
      setScale(window.innerHeight / 540);
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
        {images}
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
  width: ${(props) => `${960 * props.scale}px`};
  height: ${(props) => `${540 * props.scale}px`};
  position: relative;
`;

const MousePosition = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5
`;

const Image = styled.img`
  position: absolute;
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

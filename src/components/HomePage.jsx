// Package dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const character = {
  beach: {
    height: 540,
    width: 960,
  },
  forest: {
    height: 540,
    width: 960,
  },
  candy: {
    height: 540,
    width: 960,
  },
  kate: {
    height: 110,
    width: 70,
  },
  'kate-mad': {
    height: 110,
    width: 70,
  },
  'kate-scared': {
    height: 110,
    width: 70,
  },
  mia: {
    height: 110,
    width: 90,
  },
  'mia-confused': {
    height: 110,
    width: 90,
  },
  'mia-scared': {
    height: 110,
    width: 90,
  },
  tom: {
    height: 110,
    width: 70,
  },
  'tom-confused': {
    height: 110,
    width: 70,
  },
  'tom-hurt': {
    height: 110,
    width: 70,
  },
};

const scenes = [
  [
    { img: 'beach', bottom: 0, left: 0 },
    { img: 'kate', bottom: 70, left: 100 },
    { img: 'mia', bottom: 70, left: 200 },
    { img: 'tom', bottom: 70, left: 300 },
  ],
  [
    { img: 'candy', bottom: 0, left: 0 },
    { img: 'kate-mad', bottom: 70, left: 200 },
    { img: 'mia-confused', bottom: 70, left: 300 },
    { img: 'tom-confused', bottom: 70, left: 400 },
  ],
  [
    { img: 'forest', bottom: 0, left: 0 },
    { img: 'kate-scared', bottom: 70, left: 300 },
    { img: 'mia-scared', bottom: 70, left: 400 },
    { img: 'tom-hurt', bottom: 70, left: 500 },
  ],
];


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Home() {
  const [scale, setScale] = useState(1);
  const [page, setPage] = useState(0);

  const images = scenes[page].map((item) => {
    const style = {
      height: scale * character[item.img].height,
      width: scale * character[item.img].width,
      bottom: scale * item.bottom,
      left: scale * item.left,
    };
    return <Character src={`../../assets/${item.img}.png`} style={style} />;
  });


  function handleResize() {
    if (window.innerWidth / window.innerHeight <= 16 / 9) {
      setScale(window.innerWidth / 960);
    } else {
      setScale(window.innerHeight / 540);
    }
  }

  function handleClick() {
    if (page < scenes.length - 1) {
      setPage(page + 1);
    } else {
      setPage(0);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  });

  useEffect(() => {
    handleResize();
  }, []);


  return (
    <Container>
      <BookContainer scale={scale}>
        {images}
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

const Character = styled.img`
/*
  width: ${(props) => `${70 * props.scale}px`};
  height: ${(props) => `${110 * props.scale}px`};
  bottom: ${(props) => `${70 * props.scale}px`};
  left: ${(props) => `${200 * props.scale}px`};
  */
  position: absolute;
`;

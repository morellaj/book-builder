/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { defaultHeight, defaultWidth } from 'Constants';
import Scene from './Scene';
import Template from './Template';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function ViewerPage(props) {
  const {
    book, page, handleNext, handleBack,
  } = props;
  const [scale, setScale] = useState(1);

  const permanentList = book[0].filter((item) => page === 0 || (item.start <= page && item.end >= page));
  const newList = book[page].slice(1);
  const permanentScene = <Scene list={permanentList} scale={scale} book={book} page={page} />;
  const newScene = <Scene list={newList} scale={scale} book={book} page={page} />;

  function handleResize() {
    const { clientWidth, clientHeight } = document.getElementById('viewer').parentElement;
    if (clientWidth / clientHeight <= defaultWidth / defaultHeight) {
      setScale(clientWidth / defaultWidth);
    } else {
      setScale(clientHeight / defaultHeight);
    }
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

  const template = book[page][0] ? book[page][0].template : 'blank';

  return (
    <Container id="viewer">
      <BookContainer scale={scale}>
        <Template
          template={template}
          scale={scale}
          handleNext={handleNext}
          handleBack={handleBack}
        />
        {permanentScene}
        {newScene}
      </BookContainer>
    </Container>
  );
}


// Styling
const Container = styled.div`
  overflow: hidden;
`;

const BookContainer = styled.div`
  background-color: white;
  width: ${(props) => `${defaultWidth * props.scale}px`};
  height: ${(props) => `${defaultHeight * props.scale}px`};
  position: relative;
`;

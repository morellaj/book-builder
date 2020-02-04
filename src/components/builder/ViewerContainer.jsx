/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React, { useState } from 'react';
// import { saveAs } from 'file-saver';
import styled from 'styled-components';
import ViewerPage from '../viewer/ViewerPage';
import ButtonList from './ButtonList';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function BuilderPage(props) {
  const {
    book, page, setPage, setAdd,
  } = props;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function handleMouseMove(e) {
    setX(e.clientX);
    setY(e.clientY);
  }

  function handleNext() {
    if (page < Object.keys(book).length) {
      setPage(page + 1);
    }
  }

  function handleBack() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  return (
    <ViewerContainer onMouseMove={handleMouseMove}>
      <ViewerPageContainer>
        <ViewerPage book={book} page={page} handleNext={handleNext} handleBack={handleBack} />
      </ViewerPageContainer>
      <ButtonList book={book} handleNext={handleNext} handleBack={handleBack} setAdd={setAdd} setPage={setPage} />
      <MousePosition>
        {`x: ${(x).toFixed(0)}`}
        {'   '}
        {`y: ${(540 - y).toFixed(0)}`}
        {'   '}
        {`page: ${page}`}
      </MousePosition>
    </ViewerContainer>
  );
}


// Styling
const ViewerContainer = styled.div`
  position: relative;
  height: 540px;
  display: flex;
`;

const ViewerPageContainer = styled.div`
  flex: 540px 0 0;
`;

const MousePosition = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5
`;

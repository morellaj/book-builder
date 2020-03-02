/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled from 'styled-components';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Template(props) {
  const {
    template, scale, handleNext, handleBack,
  } = props;
  const leftArrow = <SlideArrow src="../../assets/right-arrow.png" scale={scale} value="forward" onClick={handleNext} />;
  const rightArrow = <SlideArrow src="../../assets/left-arrow.png" scale={scale} value="back" onClick={handleBack} />;
  let content;
  switch (template) {
    case 'standard':
      content = (
        <>
          {leftArrow}
          {rightArrow}
        </>
      );
      break;
    case 'firstSlide':
      content = (
        <>
          {leftArrow}
        </>
      );
      break;
    case 'lastSlide':
      content = (
        <>
          {rightArrow}
        </>
      );
      break;
    case 'blank':
      content = null;
      break;
    default:
      content = null;
  }

  return (
    <>
      {content}
    </>
  );
}


// Styling
const SlideArrow = styled.img`
  position: absolute;
  z-index: 10;
  width: ${(props) => `${80.4 * props.scale}px`};
  height: ${(props) => `${80.4 * props.scale}px`};
  bottom: ${(props) => `${0 * props.scale}px`};
  left: ${(props) => (props.value === 'forward' ? `${870 * props.scale}px` : `${0 * props.scale}px`)};
  cursor: pointer;
`;

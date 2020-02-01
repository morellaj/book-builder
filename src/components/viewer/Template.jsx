/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled from 'styled-components';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Template(props) {
  const { template, scale, handleNext, handleBack } = props;
  let content;
  switch (template) {
    case 'standard':
      content = (
        <>
          <SlideArrow src="../../assets/right-arrow.png" scale={scale} value="forward" onClick={handleNext} />
          <SlideArrow src="../../assets/left-arrow.png" scale={scale} value="back" onClick={handleBack} />
        </>
      );
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

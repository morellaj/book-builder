/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { defaultHeight, defaultWidth, standardBubbleColors } from 'Constants';
import { characters } from 'Data/imageData';
import Error from 'Error';
import Item from './Item';
import Character from './Character';
import Speech from './Speech';
import Background from './Background';
import Template from './Template';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function ViewerPage(props) {
  const {
    book, page, handleNext, handleBack,
  } = props;
  const [scale, setScale] = useState(1);

  let i = 0;
  const perm = book[0].filter((item) => page === 0 || (item.start <= page && item.end >= page));
  const permanentScene = perm.map((image) => {
    i += 1;
    let elem;
    let speechCount = 0;
    if (image.character) {
      elem = (
        <Character
          scale={scale}
          image={image}
          value={i}
          key={image.character}
        />
      );
    } else if (image.background) {
      elem = (
        <Background
          scale={scale}
          image={image}
          value={i}
          key={image.background}
        />
      );
    } else if (image.item) {
      elem = (
        <Item
          scale={scale}
          image={image}
          value={i}
          key={image.item}
        />
      );
    } else if (image.text) {
      let tLeft;
      let tBottom;
      let tWidth;
      const tar = image.target;
      if (!tar) {
        tLeft = image.tLeft;
        tBottom = image.tBottom;
        tWidth = 0;
      } else {
        const target = book[page].find((entry) => {
          let temp;
          if (entry.character) {
            temp = entry.character.match(/([A-Z]?[^A-Z]*)/g)[0].split('-')[0] === tar;
          } else { temp = false; }
          return temp;
        });
        tLeft = target.left;
        tBottom = target.bottom;
        const pose = target.character.split('-')[0];
        tWidth = characters[pose] ? characters[pose].width : 0;
      }

      let textColor;
      let backgroundColor;
      if (!tar) {
        textColor = standardBubbleColors.textColor;
        backgroundColor = standardBubbleColors.backgroundColor;
      } else {
        textColor = characters[tar].textColor;
        backgroundColor = characters[tar].backgroundColor;
      }

      speechCount += 1;
      elem = (
        <Speech
          scale={scale}
          speech={image}
          tLeft={tLeft}
          tBottom={tBottom}
          textColor={textColor}
          backgroundColor={backgroundColor}
          tWidth={tWidth}
          speechCount={speechCount}
          value={i}
          key={speechCount}
        />
      );
    }
    return elem;
  });

  i = 0;
  const newScene = book[page].slice(1).map((image) => {
    i += 1;
    let elem;
    let speechCount = 0;
    if (image.character) {
      elem = (
        <Error>
          <Character
            scale={scale}
            image={image}
            value={i}
            key={image.character}
          />
        </Error>
      );
    } else if (image.background) {
      elem = (
        <Background
          scale={scale}
          image={image}
          value={i}
          key={image.background}
        />
      );
    } else if (image.item) {
      elem = (
        <Item
          scale={scale}
          image={image}
          value={i}
          key={image.item}
        />
      );
    } else if (image.text) {
      let tLeft;
      let tBottom;
      let tWidth;
      const tar = image.target;
      if (!tar) {
        tLeft = image.tLeft;
        tBottom = image.tBottom;
        tWidth = 0;
      } else {
        const target = book[page].find((entry) => {
          let temp;
          if (entry.character) {
            temp = entry.character.match(/([A-Z]?[^A-Z]*)/g)[0].split('-')[0] === tar;
          } else { temp = false; }
          return temp;
        });
        tLeft = target.left;
        tBottom = target.bottom;
        const pose = target.character.split('-')[0];
        tWidth = characters[pose].width;
      }

      let textColor;
      let backgroundColor;
      if (!tar) {
        textColor = standardBubbleColors.textColor;
        backgroundColor = standardBubbleColors.backgroundColor;
      } else {
        textColor = characters[tar].textColor;
        backgroundColor = characters[tar].backgroundColor;
      }

      speechCount += 1;
      elem = (
        <Speech
          scale={scale}
          speech={image}
          tLeft={tLeft}
          tBottom={tBottom}
          textColor={textColor}
          backgroundColor={backgroundColor}
          tWidth={tWidth}
          speechCount={speechCount}
          value={i}
          key={speechCount}
        />
      );
    }
    return elem;
  });

  const scene = permanentScene.concat(newScene);

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
        {scene}
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

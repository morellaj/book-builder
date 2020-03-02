// Package dependencies
import React from 'react';
import { standardBubbleColors } from 'Constants';
import { characters } from 'Data/imageData';
import Error from 'Error';
import Item from './Item';
import Character from './Character';
import Speech from './Speech';
import Background from './Background';
import Line from './Line';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function ViewerPage(props) {
  const { list, scale, book, page } = props;
  let i = 0;
  const content = list.map((image) => {
    i += 1;
    let elem;
    let speechCount = 0;
    const details = { scale, image, value: i };
    if (image.character) {
      elem = <Character details={details} key={image.character} />;
    } else if (image.background) {
      elem = <Background details={details} key={image.background} />;
    } else if (image.item) {
      elem = <Item details={details} key={image.item} />;
    } else if (image.line) {
      elem = <Line details={details} key={image.line} />;
    } else if (image.text) {
      let tLeft = 0;
      let tBottom = 0;
      let tWidth = 0;
      const tar = image.target;
      if (!tar) {
        tLeft = image.tLeft || 0;
        tBottom = image.tBottom || 0;
      } else {
        const target = book[page].find((entry) => {
          let temp;
          if (entry.character) {
            temp = entry.character.match(/([A-Z]?[^A-Z]*)/g)[0].split('-')[0] === tar;
          } else { temp = false; }
          return temp;
        });
        tLeft = target ? target.left || 0 : 0;
        tBottom = target ? target.bottom || 0 : 0;
        const pose = target ? target.character.split('-')[0] : null;
        tWidth = characters[pose] ? characters[pose].width : 0;
      }

      let { textColor } = standardBubbleColors;
      let { backgroundColor } = standardBubbleColors;
      if (tar) {
        textColor = characters[tar] ? characters[tar].textColor : textColor;
        backgroundColor = characters[tar] ? characters[tar].backgroundColor : backgroundColor;
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


  return (
    <>
      {content}
    </>
  );
}

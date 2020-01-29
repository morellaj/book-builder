
// Dependencies
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  defaultWidth,
  bubbleHeight,
  bubbleMargin,
  bubblePaddingSizes,
  bubbleFontSizes,
  blockWidth,
  blockHeight,
  blockMargin,
} from 'Constants';
import SpeechTriangle from './SpeechTriangle';


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Speech(props) {
  const {
    scale,
    speech,
    tLeft,
    tBottom,
    tWidth,
    textColor,
    backgroundColor,
    speechCount,
  } = props;

  const {
    text,
    bottom,
    left,
    padding,
    size,
    noTriangle,
    maxWidth,
  } = speech;

  const theme = { textColor, backgroundColor };

  const bubblePadding = [];
  if (!padding) {
    for (let i = 0; i < text.length; i += 1) {
      bubblePadding.push(bubblePaddingSizes.standard);
    }
  } else if (typeof padding === 'object') {
    for (let i = 0; i < text.length; i += 1) {
      const temp = bubblePaddingSizes[padding[i]] || padding[i];
      bubblePadding.push(temp);
    }
  } else {
    const temp = bubblePaddingSizes[padding] || padding;
    for (let i = 0; i < text.length; i += 1) {
      bubblePadding.push(temp);
    }
  }

  const fontSize = [];
  if (!size) {
    for (let i = 0; i < text.length; i += 1) {
      fontSize.push(bubbleFontSizes.standard);
    }
  } else if (typeof size === 'object') {
    for (let i = 0; i < text.length; i += 1) {
      const temp = bubbleFontSizes[size[i]] || size[i];
      fontSize.push(temp);
    }
  } else {
    const temp = bubbleFontSizes[size] || size;
    for (let i = 0; i < text.length; i += 1) {
      fontSize.push(temp);
    }
  }

  const containerStyle = { bottom: scale * bottom || scale * (tBottom + bubbleHeight) };
  if (maxWidth) {
    containerStyle.maxWidth = scale * maxWidth;
  }
  if (left) {
    containerStyle.left = scale * left;
  } else if (tLeft > defaultWidth / 2) {
    containerStyle.right = scale * (defaultWidth - tLeft - tWidth / 2);
  } else {
    containerStyle.left = scale * (tLeft - tWidth);
  }


  const content = [];
  for (let i = 0; i < text.length; i += 1) {
    const style = {
      fontSize: scale * fontSize[i],
      padding: scale * bubblePadding[i],
      borderRadius: scale * (bubblePadding[i] / 2),
      marginLeft: scale * bubbleMargin * i,
    };
    if (i === text.length - 1) {
      if (noTriangle) {
        content.push(<Bubble style={style}>{text[i]}</Bubble>);
      } else {
        content.push(
          <Bubble style={style}>
            {text[i]}
            <SpeechTriangle
              textLength={text.length}
              scale={scale}
              left={left}
              tLeft={tLeft}
              tBottom={tBottom}
              tWidth={tWidth}
              containerBottom={containerStyle.bottom}
              bubblePadding={bubblePadding[i]}
              speechCount={speechCount}
            />
          </Bubble>,
        );
      }
    } else {
      const blockStyle = {
        height: scale * blockHeight,
        width: scale * blockWidth,
        marginLeft: scale * blockMargin * (i + 1),
      };
      content.push(<Bubble style={style}>{text[i]}</Bubble>);
      content.push(<Block style={blockStyle} />);
    }
  }

  return (
    <Container style={containerStyle}>
      <ThemeProvider theme={theme}>
        {content}
      </ThemeProvider>
    </Container>
  );
}


// Styling
const Container = styled.div`
  position: absolute;
`;

const Bubble = styled.div`
  position: relative;
  color: ${(props) => (props.theme.textColor)};
  background-color: ${(props) => (props.theme.backgroundColor)};
  display: inline-block;
`;

const Block = styled.div`
  background-color: ${(props) => (props.theme.backgroundColor)};
`;

/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const colors = {
  kate: { textColor: 'black', bgColor: 'orange' },
  standard: { textColor: 'black', bgColor: 'gray' },
};

const sizes = {
  standard: '16',
};

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Speech(props) {
  const { scale, speech } = props;
  const {
    text, bottom, left, character,
  } = speech;

  const { textColor, bgColor } = colors[character];
  const theme = {
    color: textColor,
    backgroundColor: bgColor,
  };

  const content = [];
  for (let i = 0; i < text.length; i += 1) {
    const style = {
      fontSize: scale * 16,
      padding: scale * 20,
      borderRadius: scale * 10,
      marginLeft: scale * 20 * i,
    };

    content.push(<Bubble style={style}>{text[i]}</Bubble>);

    if (i === text.length - 1) {
      const blockStyle = {
        right: scale * 40,
        borderLeftWidth: scale * 10,
        borderRightWidth: scale * 10,
        borderTopWidth: scale * 45,
      };
      content.push(<Triangle style={blockStyle} />);
    } else {
      const blockStyle = {
        height: scale * 10,
        width: scale * 15,
        marginLeft: 40 * (i + 1) * scale,
      };
      content.push(<Block style={blockStyle} />);
    }
  }

  const bubbleStyle = {
    bottom: scale * (bottom + 250),
    right: scale * (960 - left - 100),
  };

  return (
    <Container style={bubbleStyle}>
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
  color: ${(props) => (props.theme.color)};
  background-color: ${(props) => (props.theme.backgroundColor)};
  display: inline-block;
`;

const Block = styled.div`
  background-color: ${(props) => (props.theme.backgroundColor)};
`;

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left-style: solid;
  border-right-style: solid;
  border-top-style: solid;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: ${(props) => (props.theme.backgroundColor)};
`;

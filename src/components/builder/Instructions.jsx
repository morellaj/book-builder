// Package dependencies
import React from 'react';
import styled from 'styled-components';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Instructions() {
  return (
    <Container>
      <Heading>Instructions</Heading>
      <Text>Used buttons above to save the file, change pages, or add images</Text>
      <Text>Drag an image (other than the background) to move it</Text>
      <Text>Right click an image to change some of the properties</Text>
      <Text>Any property can be changed using textarea below</Text>
      <Heading>Note</Heading>
      <Text>If there textarea format is not a valid json (probably trailing comma), it will error until it is fixed</Text>
      <Text>Images will be layered based on their order in the json</Text>
    </Container>
  );
}


// Styling
const Container = styled.div`
  margin-top: 30px;
  padding: 5px;
  font-size: 14px;
`;

const Heading = styled.div`
  font-size: 16px;
  font-weight: 900;
  text-align: center;
`;

const Text = styled.div`
  margin: 5px;
`;

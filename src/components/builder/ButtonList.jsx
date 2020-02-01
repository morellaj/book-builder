// Package dependencies
import React from 'react';
import { saveAs } from 'file-saver';
import styled from 'styled-components';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function BuilderPage(props) {
  const {
    handleNext, handleBack, book, setAdd,
  } = props;

  function handleSave() {
    const blob = new Blob([JSON.stringify(book)], { type: 'application/json' });
    saveAs(blob, 'hello world.json');
  }


  return (
    <Container>
      <Button onClick={handleBack}>Previous Page</Button>
      <Button onClick={handleNext}>Next Page</Button>
      <Button onClick={handleSave}>Save File</Button>
      <Button onClick={() => (setAdd('character'))}>Add Character</Button>
    </Container>
  );
}


// Styling
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
`;

const Button = styled.div`
  padding: 3px;
  margin: 3px;
  border: solid 1px black;
  background-color: white;
  cursor: pointer;
`;

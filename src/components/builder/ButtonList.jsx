// Package dependencies
import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import styled from 'styled-components';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function BuilderPage(props) {
  const [goPage, setGoPage] = useState('');
  const {
    handleNext, handleBack, book, setAdd, setPage,
  } = props;

  function handleSave() {
    const blob = new Blob([JSON.stringify(book)], { type: 'application/json' });
    saveAs(blob, 'hello world.json');
  }

  function handleGoPageChange(e) {
    setGoPage(e.target.value);
  }

  function handleGoPageClick() {
    setPage(parseInt(goPage, 10));
  }

  return (
    <Container>
      <Button onClick={handleBack}>Previous Page</Button>
      <Button onClick={handleNext}>Next Page</Button>
      <Button onClick={handleSave}>Save File</Button>
      <Button onClick={() => (setAdd('character'))}>Add Character</Button>
      <Button onClick={() => (setAdd('background'))}>Add Background</Button>
      <Button onClick={() => (setAdd('item'))}>Add Item</Button>
      <PageContainer value={goPage} onChange={handleGoPageChange}>
        <PageEntry rows="1" cols="3" />
        <Go onClick={handleGoPageClick}>Go</Go>
      </PageContainer>
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

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 3px;
  border: solid 1px black;
`;

const PageEntry = styled.textarea`
  
`;

const Go = styled.div`
  cursor: pointer;
  padding: 3px;
  background-color: lightblue;
  font-weight: 700;
  margin: 3px;
`;

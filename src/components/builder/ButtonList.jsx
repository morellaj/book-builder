// Package dependencies
import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import useInterval from 'react-useinterval';
import styled from 'styled-components';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function BuilderPage(props) {
  const [goPage, setGoPage] = useState('');
  const [fileName, setFileName] = useState('new file');
  const {
    handleNext, handleBack, book, setAdd, setPage,
  } = props;

  function handleSave(e) {
    const blob = new Blob([JSON.stringify(book)], { type: 'application/json' });
    if (!e) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const yyyy = today.getFullYear();
      const timestamp = `${mm}/${dd}/${yyyy} ${h}:${m}:${s}`;
      saveAs(blob, `backup ${fileName} ${timestamp}.json`);
    } else if (e.target.getAttribute('value') === 'draft') {
      saveAs(blob, `draft ${fileName}.json`);
    } else if (e.target.getAttribute('value') === 'website') {
      saveAs(blob, `${fileName}.json`);
    }
  }

  function handleGoPageChange(e) {
    setGoPage(e.target.value);
  }

  function handleFileNameChange(e) {
    setFileName(e.target.value);
  }

  function handleGoPageClick() {
    setPage(parseInt(goPage, 10));
  }

  useInterval(handleSave, 10000);

  return (
    <Container>
      <FileName rows="1" cols="20" value={fileName} onChange={handleFileNameChange} />
      <Button value="draft" onClick={handleSave}>Save Draft</Button>
      <Button value="website" onClick={handleSave}>Save to Website</Button>
      <Button onClick={handleBack}>Previous Page</Button>
      <Button onClick={handleNext}>Next Page</Button>
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

const FileName = styled.textarea`

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

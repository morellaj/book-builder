// Package dependencies
import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import useInterval from 'react-useinterval';
import styled from 'styled-components';
import Instructions from './Instructions';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function BuilderPage(props) {
  const [goPage, setGoPage] = useState('');
  const { handleNext, handleBack, book, setAdd, setPage, fileName, setFileName } = props;

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
      saveAs(blob, `${fileName} ${timestamp}_backup.json`);
    } else if (e.target.getAttribute('value') === 'draft') {
      saveAs(blob, `${fileName}_draft.json`);
    } else if (e.target.getAttribute('value') === 'website') {
      saveAs(blob, `${fileName}.json`);
    }
  }

  // useInterval(handleSave, 10000);  // online viewing

  return (
    <Container>
      <Button onClick={() => (setAdd('file'))}>Open file</Button>
      <FileName rows="1" cols="20" value={fileName} onChange={(e) => (setFileName(e.target.value))} />
      <Button value="draft" onClick={handleSave}>Save Draft</Button>
      {/* <Button value="website" onClick={handleSave}>Save to Website</Button>online viewing */}
      <Button onClick={handleBack}>Previous Page</Button>
      <Button onClick={handleNext}>Next Page</Button>
      <PageContainer value={goPage} onChange={(e) => (setGoPage(e.target.value))}>
        <PageEntry rows="1" cols="3" />
        <Go onClick={() => (setPage(parseInt(goPage)))}>Go</Go>
      </PageContainer>
      <Button onClick={() => (setAdd('character'))}>Add Character</Button>
      <Button onClick={() => (setAdd('background'))}>Add Background</Button>
      <Button onClick={() => (setAdd('item'))}>Add Item</Button>
      <Button onClick={() => (setAdd('layout'))}>Add Layout</Button>
      <Instructions />
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

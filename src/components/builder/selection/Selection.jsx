// Package dependencies
import React, { useState } from 'react';
import styled from 'styled-components';
import FileSelection from './FileSelection';
import ImageSelection from './ImageSelection';
import LayoutSelection from './LayoutSelection';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Selection(props) {
  const [search, setSearch] = useState('');
  const { add, setAdd, setText, stuck, page, setBook, setPage, setFileName } = props;

  let content;
  switch (add) {
    case 'character':
    case 'background':
    case 'item':
      content = <ImageSelection setText={setText} search={search} page={page} add={add} />;
      break;
    case 'file':
      content = <FileSelection search={search} setBook={setBook} page={page} setPage={setPage} setFileName={setFileName} />;
      break;
    case 'layout':
      content = <LayoutSelection setText={setText} search={search} page={page} />;
      break;
    default:
      break;
  }

  return (
    <Container add={add} stuck={stuck}>
      <UpperContainer>
        <div>Search:</div>
        <SearchBar value={search} onChange={(e) => (setSearch(e.target.value))} />
        <Exit onClick={() => (setAdd(''))}>EXIT</Exit>
      </UpperContainer>
      {content}
    </Container>
  );
}

// Styling
const Container = styled.div`
  flex-wrap: wrap;
  padding: 5px;
  width: 80%;
  position: absolute;
  top: 100px;
  left: 100px;
  background-color: white;
  border-radius: 5px;
  z-index: 100;
  border: 3px solid black;
  display: ${(props) => (!props.stuck && props.add ? 'flex' : 'none')}
`;

const UpperContainer = styled.div`
  width: 100%;
  display: flex;
  align-items:center;
`;

const Exit = styled.div`
  color: white;
  border-radius: 5px;
  background-color: darkred;
  padding: 3px;
  margin-right: 10px;
  cursor: pointer;
`;

const SearchBar = styled.textarea`
  width: 100%;
  margin-right: 100px;
`;

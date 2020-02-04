// Package dependencies
import React, { useState } from 'react';
import styled from 'styled-components';
import CharacterSelection from './CharacterSelection';
import BackgroundSelection from './BackgroundSelection';
import ItemSelection from './ItemSelection';
import FileSelection from './FileSelection';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Selection(props) {
  const {
    add, setAdd, setText, stuck, page, setBook, setPage,
  } = props;
  const [search, setSearch] = useState('');

  function handleChange(e) {
    setSearch(e.target.value);
  }

  let content;
  switch (add) {
    case 'character':
      content = <CharacterSelection setText={setText} search={search} page={page} />;
      break;
    case 'background':
      content = <BackgroundSelection setText={setText} search={search} page={page} />;
      break;
    case 'item':
      content = <ItemSelection setText={setText} search={search} page={page} />;
      break;
    case 'file':
      content = <FileSelection search={search} setBook={setBook} setPage={setPage} />;
      break;
    default:
      break;
  }

  return (
    <Container add={add} stuck={stuck}>
      <UpperContainer>
        <div>Search:</div>
        <SearchBar value={search} onChange={handleChange} />
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

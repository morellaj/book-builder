// Package dependencies
import React from 'react';
import styled from 'styled-components';
import importAll from '../importAll';

const files = importAll(require.context('Books/', false, /\.(json)$/));
const list = Object.keys(files);

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function FileSelection(props) {
  const { search, setBook, page, setPage, setFileName } = props;

  function handleClick(e) {
    const name = e.target.getAttribute('value');
    const nameReduced = name.split('_');
    setPage(1);
    if (page === 1) {
      setPage(0);
    }
    setBook(files[`${name}.json`]);
    setFileName(nameReduced[0]);
  }

  const content = list.map((file) => {
    const name = file.split('.')[0];
    return <File value={name} onClick={handleClick} search={search} key={name}>{name}</File>;
  });


  return (
    <Container>
      { content }
    </Container>
  );
}

// Styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const File = styled.div`
  border: 1px solid gray;
  padding: 5px;
  font-size: 12px;
  cursor: pointer;
  display: ${(props) => (props.value.toLowerCase().includes(props.search.toLowerCase()) ? 'flex' : 'none')};
`;

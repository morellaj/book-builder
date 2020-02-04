// Package dependencies
import React from 'react';
import styled from 'styled-components';

function importAll(r) {
  const images = {};
  const keys = r.keys();
  for (let i = 0; i < keys.length; i += 1) {
    images[keys[i].replace('./', '')] = r(keys[i]);
  }
  return images;
}


/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function FileSelection(props) {
  const {
    search, setBook, setPage,
  } = props;

  const files = importAll(require.context('Books/', false, /\.(json)$/));
  const list = Object.keys(files);

  function handleClick(e) {
    const name = e.target.getAttribute('value');
    setPage(1);
    setBook(files[`${name}.json`]);
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

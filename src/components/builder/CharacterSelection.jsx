// Package dependencies
import React, { useState } from 'react';
import styled from 'styled-components';
import { characters } from 'Data/imageData';

function importAll(r) {
  const images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('Assets/characters/', false, /\.(png|jpe?g|svg)$/));
const list = Object.keys(images);

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function CharacterSelection(props) {
  const { add, setAdd, setText } = props;
  const [search, setSearch] = useState('');

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleClick(e) {
    const name = e.target.getAttribute('value');
    setText({ type: 'add', category: 'character', image: name });
  }

  const content = list.map((image) => {
    const name = image.split('.')[0];
    const pose = name.split('-')[0];
    const char = characters[pose];
    const style = {
      height: char.height,
      width: char.width,
    };
    return (
      <ImageContainer value={name} search={search} onClick={handleClick}>
        <Image src={`Assets/characters/${image}`} style={style} value={name} />
        <Label value={name}>{name}</Label>
      </ImageContainer>
    );
  });


  return (
    <Container add={add}>
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
  display: ${(props) => (props.add === 'character' ? 'flex' : 'none')}
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

const Label = styled.div`
  font-size: 12px;
`;

const ImageContainer = styled.div`
  flex-direction: column;
  align-items: center;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  display: ${(props) => (props.value.toLowerCase().includes(props.search.toLowerCase()) ? 'flex' : 'none')};

  :hover {
    background-color: gray;
  }
`;

const Image = styled.img`
  width: 100%;
`;

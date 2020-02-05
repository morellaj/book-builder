// Package dependencies
import React from 'react';
import styled from 'styled-components';
import { characters, items } from 'Data/imageData';
import Error from 'Error';
import importAll from './importAll';

const characterList = importAll(require.context('Assets/characters/', false, /\.(png|jpe?g|svg)$/));
const backgroundList = importAll(require.context('Assets/backgrounds/', false, /\.(png|jpe?g|svg)$/));
const itemList = importAll(require.context('Assets/items/', false, /\.(png|jpe?g|svg)$/));

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function ImageSelection(props) {
  const {
    setText, search, page, add,
  } = props;

  function handleClick(e) {
    const name = e.target.getAttribute('value');
    setText({
      type: 'add', category: add, image: name, page,
    });
  }

  let list;
  if (add === 'character') {
    list = characterList;
  } else if (add === 'background') {
    list = backgroundList;
  } else if (add === 'item') {
    list = itemList;
  }


  const content = Object.keys(list).map((image) => {
    const name = image.split('.')[0];
    let style;
    switch (add) {
      case 'background':
        style = { height: '162px', width: '288px' };
        break;
      case 'character': {
        const { height, width } = characters[name.split('-')[0]];
        style = { height, width };
      }
        break;
      case 'item': {
        const { height, width } = items[name];
        style = { height, width };
        break;
      }
      default:
        break;
    }
    return (
      <ImageContainer value={name} search={search} onClick={handleClick} key={name}>
        <Image src={`Assets/${add}s/${image}`} style={style} value={name} />
        <Label value={name}>{name}</Label>
      </ImageContainer>
    );
  });

  return (
    <>
      { content }
    </>
  );
}

// Styling
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

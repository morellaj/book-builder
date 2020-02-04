// Package dependencies
import React from 'react';
import styled from 'styled-components';
import { items } from 'Data/imageData';

function importAll(r) {
  const images = {};
  const keys = r.keys();
  for (let i = 0; i < keys.length; i += 1) {
    images[keys[i].replace('./', '')] = r(keys[i]);
  }
  return images;
}

const images = importAll(require.context('Assets/items/', false, /\.(png|jpe?g|svg)$/));
const list = Object.keys(images);

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function CharacterSelection(props) {
  const { setText, search, page } = props;

  function handleClick(e) {
    const name = e.target.getAttribute('value');
    setText({
      type: 'add', category: 'item', image: name, page,
    });
  }

  const content = list.map((image) => {
    const name = image.split('.')[0];
    const data = items[name];
    const style = {
      height: data.height,
      width: data.width,
    };
    return (
      <ImageContainer value={name} search={search} onClick={handleClick} key={name}>
        <Image src={`Assets/items/${image}`} style={style} value={name} />
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

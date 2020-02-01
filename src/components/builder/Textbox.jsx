// Package dependencies
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Textbox(props) {
  const [stuck, setStuck] = useState(false);
  const {
    text, setText, book, setBook, page,
  } = props;

  function handleChange(e) {
    setStuck(true);
    setText(e.target.value);
  }

  function getText() {
    setText(JSON.stringify(book[page]).split('},').join('},\n'));
  }

  useEffect(() => {
    getText();
  }, []);

  useEffect(() => {
    getText();
  }, [page]);

  useEffect(() => {
    function parse() {
      try {
        return JSON.parse(document.getElementById('textbox').innerHTML);
      } catch (err) {
        return false;
      }
    }
    const update = parse();
    if (update) {
      const obj = {};
      obj[page] = update;
      setBook(obj);
      setStuck(false);
    }
  }, [text]);

  return (
    <>
      <Container value={text} onChange={handleChange} id="textbox" />
      <Error stuck={stuck}>Error</Error>
    </>
  );
}


// Styling
const Container = styled(Textarea)`
  width: 100%;
`;

const Error = styled.div`
  position: absolute;
  font-size: 40px;
  right: 0;
  top: 0;
  color: red;
  font-weight: 700;
  display: ${(props) => (props.stuck ? 'block' : 'none')}
`;

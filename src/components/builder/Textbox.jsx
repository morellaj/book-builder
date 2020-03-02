// Package dependencies
import React, { useEffect } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import converter from './converter';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function Textbox(props) {
  const { text, setText, book, setBook, page, stuck, setStuck } = props;

  function handleChange(e) {
    setStuck(true);
    setText(e.target.value);
  }

  function getText() {
    setText(converter(book[page]));
  }

  useEffect(() => {
    getText();
  }, [page]);

  useEffect(() => {
    function parse() {
      try {
        return converter(document.getElementById('textbox').innerHTML);
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

  const perm = book[0].filter((item) => item.start <= page && item.end >= page);
  const permanentContent = converter(perm);
  return (
    <Container>
      <PermanentContainer>
        {permanentContent}
      </PermanentContainer>
      <CurrentContainer value={text} onChange={handleChange} id="textbox" spellCheck="false" />
      <Error stuck={stuck}>Error</Error>
      <ReactDiffViewer oldValue={converter(book[page])} newValue={text} compareMethod={DiffMethod.WORDS_WITH_SPACE} />
    </Container>

  );
}


// Styling
const Container = styled.div`
  font: 400 13.3333px Arial;
`;

const PermanentContainer = styled.div`
  padding: 2px;
  white-space: pre-wrap;
`;

const CurrentContainer = styled(Textarea)`
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

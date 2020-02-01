/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React, { useState, useReducer, useEffect } from 'react';
// import { saveAs } from 'file-saver';
import styled from 'styled-components';
import newBook from 'Data/book1.json';
import Textarea from 'react-textarea-autosize';
import produce from 'immer';
import { set, has } from 'lodash';
import ViewerPage from '../viewer/ViewerPage';
import ButtonList from './ButtonList';


function bookReducer(state, updateArg) {
  if (updateArg.constructor === Function) {
    return { ...state, ...updateArg(state) };
  }
  if (updateArg.constructor === Object) {
    if (has(updateArg, '_path') && has(updateArg, '_value')) {
      const { _path, _value } = updateArg;
      return produce(state, (draft) => {
        set(draft, _path, _value);
      });
    }
    return { ...state, ...updateArg };
  }
  return null;
}

function textReducer(state, action) {
  // const currentState = JSON.parse(state);
  if (action.constructor === Object) {
    const currentState = JSON.parse(state);
    if (action.type === 'position') {
      currentState[action.num].left += action.update.left;
      currentState[action.num].bottom += action.update.bottom;
      return JSON.stringify(currentState).split('},').join('},\n');
    }
  }
  return action;
}

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function BuilderPage() {
  const [book, setBook] = useReducer(bookReducer, newBook);
  const [text, setText] = useReducer(textReducer, '[]');
  const [stuck, setStuck] = useState(false);
  const [page, setPage] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [hover, setHover] = useState(false);

  function handleMouseOut() {
    setHover(false);
  }

  function handleMouseMove(e) {
    setHover(true);
    setX(e.clientX);
    setY(e.clientY);
  }

  function handleChange(e) {
    setStuck(true);
    setText(e.target.value);
  }

  function handleDragStart(e) {
    setDragX(e.clientX);
    setDragY(e.clientY);
  }

  function handleDragEnd(e) {
    const xChange = e.clientX - dragX;
    const yChange = dragY - e.clientY;
    setText({ num: e.target.getAttribute('value'), type: 'position', update: { left: xChange, bottom: yChange } });
  }

  useEffect(() => {
    setText(JSON.stringify(book[page]).split('},').join('},\n'));
  }, []);

  useEffect(() => {
    setText(JSON.stringify(book[page]).split('},').join('},\n'));
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
      <ViewerContainer onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
        <ViewerPage
          book={book[page]}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
        <Error stuck={stuck}>Error</Error>
        <ButtonList page={page} setPage={setPage} length={Object.keys(book).length} />
        <MousePosition hover={hover}>
          {`x: ${(x).toFixed(0)}`}
          {'   '}
          {`y: ${(540 - y).toFixed(0)}`}
          {'   '}
          {`page: ${page}`}
        </MousePosition>
      </ViewerContainer>

      <Textbox value={text} onChange={handleChange} id="textbox" />
    </>
  );
}


// Styling
const Textbox = styled(Textarea)`
  width: 100%;
`;

const ViewerContainer = styled.div`
  position: relative;
  height: 540px;
  display: flex;
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


const MousePosition = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5
`;


/*
  const blob = new Blob([JSON.stringify(book)], { type: 'application/json' });
  saveAs(blob, 'hello world.json');
  */

/*
    <>
      <Container value={JSON.stringify(book['1'], null, ' ')} onChange={handleChange} />
      <Relative>
        <Image src={`Assets/characters/${book[1][5].character}.png`} style={style} />
      </Relative>
    </>
    */

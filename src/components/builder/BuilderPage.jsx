// Package dependencies
import React, { useState, useEffect, useReducer } from 'react';
import newBook from 'Data/book1.json';
import produce from 'immer';
import { set, has } from 'lodash';
import Textbox from './Textbox';
import ViewerContainer from './ViewerContainer';
import CharacterSelection from './CharacterSelection';

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
  if (action.constructor === Object) {
    const currentState = JSON.parse(state);
    if (action.type === 'position') {
      currentState[action.num].left += action.update.left;
      currentState[action.num].bottom += action.update.bottom;
      return JSON.stringify(currentState).split('},').join('},\n');
    }
    if (action.type === 'add') {
      const obj = {};
      obj[action.category] = action.image;
      obj.left = 100;
      obj.bottom = 100;
      currentState.push(obj);
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
  const [page, setPage] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [add, setAdd] = useState('');

  function handleDragStart(e) {
    if (e.target.getAttribute('data-drag')) {
      setDragX(e.clientX);
      setDragY(e.clientY);
    }
  }

  function handleDragEnd(e) {
    if (e.target.getAttribute('data-drag')) {
      const xChange = e.clientX - dragX;
      const yChange = dragY - e.clientY;
      setText({ num: e.target.getAttribute('value'), type: 'position', update: { left: xChange, bottom: yChange } });
    }
  }

  useEffect(() => {
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('dragend', handleDragEnd);
    return () => {
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('dragend', handleDragEnd);
    };
  });

  return (
    <>
      <ViewerContainer
        book={book}
        page={page}
        setPage={setPage}
        setAdd={setAdd}
      />
      <Textbox
        text={text}
        setText={setText}
        book={book}
        setBook={setBook}
        page={page}
      />
      <CharacterSelection add={add} setAdd={setAdd} setText={setText} />
    </>
  );
}

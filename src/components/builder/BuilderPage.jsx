// Package dependencies
import React, { useState, useEffect, useReducer } from 'react';
import newBook from 'Data/book4.json';
import produce from 'immer';
import { set, has } from 'lodash';
import Textbox from './Textbox';
import ViewerContainer from './ViewerContainer';
import ImageSelection from './ImageSelection';
import converter from './converter';

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
    const currentState = converter(state);
    if (action.type === 'position') {
      currentState[action.num].left = String(parseInt(currentState[action.num].left, 10) + action.update.left);
      currentState[action.num].bottom = String(parseInt(currentState[action.num].bottom, 10) + action.update.bottom);
      return converter(currentState);
    }
    if (action.type === 'add') {
      if (action.category === 'character') {
        const obj = {};
        obj[action.category] = action.image;
        obj.left = '100';
        obj.bottom = '100';
        if (action.page === 0) {
          obj.start = '1';
          obj.end = '1';
        }
        currentState.push(obj);
        return converter(currentState);
      }
      if (action.category === 'background') {
        const obj = {};
        obj[action.category] = action.image;
        if (action.page === 0) {
          obj.start = '1';
          obj.end = '1';
        }
        currentState.push(obj);
        return converter(currentState);
      }
      if (action.category === 'item') {
        const obj = {};
        obj[action.category] = action.image;
        obj.left = '100';
        obj.bottom = '100';
        if (action.page === 0) {
          obj.start = '1';
          obj.end = '1';
        }
        currentState.push(obj);
        return converter(currentState);
      }
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
  const [stuck, setStuck] = useState(false);

  function handleDragStart(e) {
    if (e.target.getAttribute('data-drag') === 'true') {
      setDragX(e.clientX);
      setDragY(e.clientY);
    }
  }

  function handleDragEnd(e) {
    if (e.target.getAttribute('data-drag') === 'true') {
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
        stuck={stuck}
        setStuck={setStuck}
      />
      <ImageSelection add={add} setAdd={setAdd} setText={setText} stuck={stuck} page={page} />
    </>
  );
}

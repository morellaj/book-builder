// Package dependencies
import React, { useState, useEffect, useReducer } from 'react';
import newBook from 'Data/book4.json';
import produce from 'immer';
import { set, has } from 'lodash';
import Error from 'Error';
import Textbox from './Textbox';
import ViewerContainer from './ViewerContainer';
import Selection from './Selection';
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
      const {
        num, update: {
          leftShift, bottomShift, leftStart, bottomStart,
        },
      } = action;

      if (parseInt(num)) {
        let { left, bottom } = currentState[action.num] || { left: 0, bottom: 0 };
        left = left || leftStart;
        bottom = bottom || bottomStart;
        currentState[num].left = String(parseInt(left) + leftShift);
        currentState[num].bottom = String(parseInt(bottom) + bottomShift);
        return converter(currentState);
      }
      const parts = num.split('-');
      const parent = currentState[parts[1]];
      const item = parent.items[parts[2]] || { left: 0, bottom: 0 };
      const { reflect } = parent;
      let { left, bottom } = item || { left: 0, bottom: 0 };
      left = left || leftStart;
      bottom = bottom || bottomStart;
      item.left = reflect ? String(parseInt(left) - leftShift) : String(parseInt(left) + leftShift);
      item.bottom = String(parseInt(bottom) + bottomShift);
      return converter(currentState);
    }
    if (action.type === 'add') {
      const obj = {};
      obj[action.category] = action.image;
      if (action.category !== 'background') {
        obj.left = '100';
        obj.bottom = '100';
      }
      if (action.page === 0) {
        obj.start = '1';
        obj.end = '1';
      }
      currentState.push(obj);
      return converter(currentState);
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
      setText({
        num: e.target.getAttribute('value'),
        type: 'position',
        update: {
          leftStart: dragX,
          bottomStart: dragY,
          leftShift: xChange,
          bottomShift: yChange,
        },
      });
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
      <Error>
        <ViewerContainer
          book={book}
          page={page}
          setPage={setPage}
          setAdd={setAdd}
        />
      </Error>
      <Error>
        <Textbox
          text={text}
          setText={setText}
          book={book}
          setBook={setBook}
          page={page}
          stuck={stuck}
          setStuck={setStuck}
        />
      </Error>
      <Error>
        <Selection add={add} setAdd={setAdd} setText={setText} stuck={stuck} page={page} setBook={setBook} setPage={setPage} />
      </Error>
    </>
  );
}

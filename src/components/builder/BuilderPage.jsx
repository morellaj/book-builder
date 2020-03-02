// Package dependencies
import React, { useState, useEffect, useReducer } from 'react';
import newBook from 'Books/example.json';
import produce from 'immer';
import { set, has } from 'lodash';
import Error from 'Error';
import Textbox from './Textbox';
import ViewerContainer from './ViewerContainer';
import Selection from './selection/Selection';
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
      if (parseInt(num) && currentState[num]) {
        let { left, bottom } = currentState[num] || { left: 0, bottom: 0 };
        left = left || leftStart;
        bottom = bottom || bottomStart;
        currentState[num].left = String(parseInt(left) + leftShift);
        currentState[num].bottom = String(parseInt(bottom) + bottomShift);
        return converter(currentState);
      }
      const parts = num.split('-');
      const parent = currentState[parts[1]];
      const item = parent.items[parts[2]];
      if (parent && item) {
        const { reflect } = parent;
        let { left, bottom } = item || { left: 0, bottom: 0 };
        left = left || leftStart;
        bottom = bottom || bottomStart;
        item.left = reflect ? String(parseInt(left) - leftShift) : String(parseInt(left) + leftShift);
        item.bottom = String(parseInt(bottom) + bottomShift);
        return converter(currentState);
      }
    } else if (action.type === 'reflect') {
      const { num } = action;
      const image = currentState[num];
      if (parseInt(num) && image) {
        if (image.reflect) {
          delete image.reflect;
          return converter(currentState);
        }
        image.reflect = 'true';
        return converter(currentState);
      }
      const parts = num.split('-');
      const parent = currentState[parts[1]];
      const item = parent.items[parts[2]];
      if (parent && item) {
        if (item.reflect) {
          delete item.reflect;
          return converter(currentState);
        }
        item.reflect = 'true';
        return converter(currentState);
      }
    } else if (action.type === 'rotate') {
      const { num, value } = action;
      const image = currentState[num];
      if (parseInt(num) && image) {
        image.rotate = value;
        return converter(currentState);
      }
      const parts = num.split('-');
      const parent = currentState[parts[1]];
      const item = parent.items[parts[2]];
      if (parent && item) {
        item.rotate = value;
        return converter(currentState);
      }
    } else if (action.type === 'clip') {
      const { num, xValue, yValue } = action;
      const image = currentState[num];
      if (parseInt(num) && image) {
        image.clip = [xValue, yValue];
        return converter(currentState);
      }
      const parts = num.split('-');
      const parent = currentState[parts[1]];
      const item = parent.items[parts[2]];
      if (parent && item) {
        image.clip = [xValue, yValue];
        return converter(currentState);
      }
    } else if (action.type === 'delete') {
      const { num } = action;
      const image = currentState[num];
      if (parseInt(num) && image) {
        currentState.splice(num, 1);
        return converter(currentState);
      }
      const parts = num.split('-');
      const parent = currentState[parts[1]];
      const item = parent.items[parts[2]];
      if (parent && item) {
        delete currentState[parts[1]].items.splice(parts[2]);
        return converter(currentState);
      }
      /*
    } else if (action.type === 'add') {
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
    */
    } else if (action.type === 'add') {
      currentState.push(action.update);
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
  const [fileName, setFileName] = useState('new file');
  const [menu, setMenu] = useState('');

  function handleDragStart(e) {
    if (e.target.getAttribute('data-drag') === 'true') {
      setDragX(e.clientX);
      setDragY(e.clientY);
    }
  }

  function handleDragEnd(e) {
    if (e.target.getAttribute('data-drag') === 'true' && !stuck) {
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

  function handleContext(e) {
    e.preventDefault();
    const num = e.target.getAttribute('value');
    const image = book[page][num];
    setMenu({ num, image, x: `${e.clientX + 100}px`, y: `${e.clientY - 100}px` });
  }

  useEffect(() => {
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('dragend', handleDragEnd);
    window.addEventListener('contextmenu', handleContext);
    return () => {
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('dragend', handleDragEnd);
      window.removeEventListener('contextmenu', handleContext);
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
          fileName={fileName}
          setFileName={setFileName}
          setText={setText}
          menu={menu}
          setMenu={setMenu}
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
        <Selection
          add={add}
          setAdd={setAdd}
          setText={setText}
          stuck={stuck}
          page={page}
          setBook={setBook}
          setPage={setPage}
          setFileName={setFileName}
        />
      </Error>
    </>
  );
}

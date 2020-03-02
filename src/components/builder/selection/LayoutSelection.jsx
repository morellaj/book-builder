// Package dependencies
import React from 'react';
import styled from 'styled-components';

const layoutList = {
  titleSlide: [
    { template: 'firstSlide' },
    { background: 'title' },
    { line: 'title', size: 'huge', left: 258, bottom: 424, width: 517 },
  ],
};

const list = Object.keys(layoutList);

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function LayoutSelection(props) {
  const { setText, search, page } = props;

  function handleClick(e) {
    const name = e.target.getAttribute('value');
    if (page !== 0) {
      const layout = layoutList[name];
      for (let i = 0; i < layout.length; i += 1) {
        const obj = layout[i];
        setText({ type: 'add', update: obj });
      }
    }
  }


  const content = list.map((item) => <Layout value={item} onClick={handleClick} search={search} key={item}>{item}</Layout>);

  return (
    <Container>
      { content }
    </Container>
  );
}

// Styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Layout = styled.div`
  border: 1px solid gray;
  padding: 5px;
  font-size: 12px;
  cursor: pointer;
  display: ${(props) => (props.value.toLowerCase().includes(props.search.toLowerCase()) ? 'flex' : 'none')};
`;

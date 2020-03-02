/* eslint-disable react/destructuring-assignment */
// Package dependencies
import React from 'react';
import styled from 'styled-components';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
  }

  render() {
    if (this.state.hasError) {
      return <Container>(•̀o•́)ง WUT DID U DU (╯°□°）╯︵ (.o.)</Container>;
    }

    return this.props.children;
  }
}

// Styling
const Container = styled.div`
    position: fixed;
    color: red;
    display: inline-block;
    text-align: center;
    font-size: 30px;
    top: 0;
    left: 200px;
`;

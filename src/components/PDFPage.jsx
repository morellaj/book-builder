// Package dependencies
import loadable from '@loadable/component';
import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import styled from 'styled-components';
// eslint-disable-next-line no-unused-vars
import AnnotationLayer from 'react-pdf/dist/Page/AnnotationLayer.css';

// Component dependencies
const ScreenButton = loadable(() => import('./ScreenButton'));
const BackButton = loadable(() => import('./BackButton'));
const Progress = loadable(() => import('./Progress'));
const Input = loadable(() => import('Common/Input'));

// Component for displaying a pdf page
export default function PDFPage(props) {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [display, setDisplay] = useState(true);
  const [scale, setScale] = useState(1);
  const [full, setFull] = useState(false);
  const [fullCap, setFullCap] = useState(false);
  const [perLoaded, setPerLoaded] = useState(0.00);
  const [progDisplay, setProgDisplay] = useState(true);
  const file = `/assets/${window.location.search.slice(1)}.pdf`;

  function handleGoBack() {
    props.history.goBack();
  }

  function handleResize() {
    if (window.innerWidth / window.innerHeight <= 16 / 9) {
      setScale(window.innerWidth / 960);
    } else {
      setScale(window.innerHeight / 540);
    }
  }


  function onFullScreenChange() {
    if (
      !document.isFullScreen
      && !document.fullscreenElement
      && !document.webkitFullscreenElement
      && !document.mozFullScreenElement
      && !document.msFullscreenElement
    ) {
      setFull(false);
    } else {
      setFull(true);
    }
  }

  useEffect(() => {
    const elem = document.getElementById('fullscreen');
    if (
      elem.requestFullscreen
      || elem.mozRequestFullScreen
      || elem.webkitRequestFullScreen
      || elem.msRequestFullScreen
    ) {
      setFullCap(true);
    }

    window.addEventListener('resize', handleResize);
    if (elem.requestFullscreen) {
      document.addEventListener('fullscreenchange', onFullScreenChange);
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      document.addEventListener('mozfullscreenchange', onFullScreenChange);
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      document.addEventListener('webkitfullscreenchange', onFullScreenChange);
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      document.addEventListener('msfullscreenchange', onFullScreenChange);
    }
    document.addEventListener('fullscreenchange', onFullScreenChange);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (elem.requestFullscreen) {
        document.removeEventListener('fullscreenchange', onFullScreenChange);
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        document.removeEventListener('mozfullscreenchange', onFullScreenChange);
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        document.removeEventListener('webkitfullscreenchange', onFullScreenChange);
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        document.removeEventListener('msfullscreenchange', onFullScreenChange);
      }
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function onDocumentLoadSuccess() {
    setPage(1);
    setLastPage(1);
    setProgDisplay(false);
    handleResize();
  }

  function onDocumentLoadProgress({ loaded }, setProgress) {
    const num = 1 - Math.exp(-loaded / 3000000);
    const newNum = (100 * num).toFixed(0);
    setProgress(newNum);
  }

  function onItemClick(e) {
    setDisplay(false);
    setPage(e.pageNumber);
  }

  function pageRender() {
    setLastPage(page);
    if (!display) {
      setDisplay(1);
    }
  }

  function fullscreenClick() {
    const elem = document.getElementById('fullscreen');
    if (!full) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }


  return (
    <>
    <Container id="fullscreen">
      <Progress perLoaded={perLoaded} progDisplay={progDisplay} />
      <StyledDoc
        file={file}
        loading={null}
        error="Book not found :("
        onLoadProgress={({ loaded }) => onDocumentLoadProgress({ loaded }, setPerLoaded)}
        onLoadSuccess={onDocumentLoadSuccess}
        onItemClick={onItemClick}
        options={{ disableAutoFetch: false, disableStream: false }}
      >
        <MainPage
          display={display}
          pageNumber={page}
          scale={scale}
          renderTextLayer={false}
          onRenderSuccess={pageRender}
        >
          <ScreenButton
            fullCap={fullCap}
            full={full}
            fullscreenClick={fullscreenClick}
          />
          <BackButton full={full} goBack={handleGoBack} />
        </MainPage>
        <LastPage display={display} pageNumber={lastPage} scale={scale} renderTextLayer={false}>
          <Loading>Loading...</Loading>
          <ScreenButton
            fullCap={fullCap}
            full={full}
            fullscreenClick={fullscreenClick}
          />
          <BackButton full={full} goBack={handleGoBack} />
        </LastPage>
      </StyledDoc>
    </Container>
    <Input />
    </>
  );
}

// Styling
const Container = styled.div`
  min-height: 700px;
`;

const StyledDoc = styled(Document)`
  display: flex;
  justify-content: center;
  height: 70%;
  margin-bottom: 20px;
`;

const MainPage = styled(Page)`
  display: ${(props) => (props.display ? 'block' : 'none')};
`;

const LastPage = styled(Page)`
  display: ${(props) => (props.display ? 'none' : 'block')};
`;

const Loading = styled.div`
  font-size: 25px;
  background-color: white;
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  padding: 5px;
  display: none;

  :hover{
    cursor: pointer;
  }
`;

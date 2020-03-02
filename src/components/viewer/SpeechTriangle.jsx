/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Package dependencies
import React, { useEffect, useState } from 'react';
import {
  defaultWidth,
  triangleWidth,
  bubbleMargin,
} from 'Constants';
import Triangle from './Triangle';

/** ********************************************* */
// Component for displaying the home page
/** ********************************************* */
export default function SpeechTriangle(props) {
  const [currentBubbleWidth, setCurrentBubbleWidth] = useState(0);
  const {
    textLength,
    scale,
    left,
    tLeft,
    tBottom,
    tWidth,
    containerBottom,
    bubblePadding,
    speechCount,
  } = props;

  const id = `triangle${speechCount}`;

  // Horizontal distance from left side of bubble container to left edge of the bottom bubble
  const currentMargin = bubbleMargin * (textLength - 1);
  // Horizontal distance from right side of bottom bubble to farthest right position of the triangle
  const rightSpacing = scale * (bubblePadding + triangleWidth);
  // Style for the container that holds the triangle
  const triangleStyle = {};

  // If the position of the bubble has been set
  if (left) {
    // Horizontal distances from bottom bubble to the character center
    const leftDistance = scale * (tLeft - left - currentMargin - triangleWidth / 2);
    const rightDistance = scale * (tLeft - left - currentBubbleWidth);
    // Vertical distance from the bottom of the bottom bubble to the character center
    const adjacent = containerBottom - scale * tBottom;
    if (leftDistance < 0 && (leftDistance / adjacent <= -1 || adjacent <= 0)) {
      triangleStyle.left = -scale * (triangleWidth / 4);
      triangleStyle.bottom = '25%';
    } else if (rightDistance > 0 && (rightDistance / adjacent >= 1 || adjacent <= 0)) {
      triangleStyle.left = currentBubbleWidth - scale * (triangleWidth * (3 / 4));
      triangleStyle.bottom = '25%';
    // If triangle would be too far to the left, set the position to the farthest left
    } else if (leftDistance < scale * (bubblePadding)) {
      triangleStyle.left = scale * bubblePadding;
    // If the triangle would be too far to the right, set the position to the farthest right
    } else if (leftDistance > currentBubbleWidth - rightSpacing) {
      triangleStyle.left = currentBubbleWidth - rightSpacing;
    // If the triangle would be in the bubble, use that position
    } else {
      triangleStyle.left = leftDistance;
    }
    const opposite = triangleStyle.left - leftDistance;
    const angle = scale * tBottom < containerBottom
      ? Math.atan(opposite / adjacent) : Math.PI + Math.atan(opposite / adjacent);
    triangleStyle.transform = `rotate(${angle}rad)`;
  } else if (tLeft > defaultWidth / 2) {
    triangleStyle.right = scale * (tWidth / 2);
  } else {
    triangleStyle.left = scale * (tWidth - currentMargin - triangleWidth / 2);
  }

  useEffect(() => {
    setCurrentBubbleWidth(document.getElementById(id).parentElement.clientWidth);
  });

  return (
    <Triangle id={id} scale={scale} style={triangleStyle} />
  );
}

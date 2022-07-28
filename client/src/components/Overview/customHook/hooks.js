import { useRef, useReducer, useCallback } from 'react';
import reducer, { initialState } from './reducer';
import { pan, startPanAndZoom } from './actions';

const usePanAndZoom = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const containerRef = useRef(null);
  const imgRef = useRef(null);

  const onMouseMoveInWindow = event => {
    event.preventDefault();
    const imgRect = imgRef.current.getBoundingClientRect();
    console.log('moving');
    dispatch(pan(event, imgRect));
  };

  const onMouseOver = (event) => {
    event.preventDefault();
    const imgRect = imgRef.current.getBoundingClientRect();
    dispatch(startPanAndZoom(event, imgRect));
    window.addEventListener('mousemove', onMouseMoveInWindow);
    imgRef.current.removeEventListener('mouseover', onMouseOver);
  };

  return {
    ...state,
    // containerRef,
    imgRef,
    onMouseOver,
    onMouseMoveInWindow,
  }
};

export default usePanAndZoom;
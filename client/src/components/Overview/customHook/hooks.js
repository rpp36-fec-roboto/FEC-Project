import { useRef, useReducer, useCallback } from 'react';
import reducer, { initialState } from './reducer';
import { pan, startPanAndZoom } from './actions';

const usePanAndZoom = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const containerRef = useRef(null);

  const onMouseMoveInWindow = useCallback (event => {
    event.preventDefault();
    console.log('moving');
    dispatch(pan(event));
  });

  const onMouseOver = (event) => {
    event.preventDefault();
    dispatch(startPanAndZoom(event));
    window.addEventListener('mousemove', onMouseMoveInWindow);
  };

  return {
    ...state,
    containerRef,
    onMouseOver,
    onMouseMoveInWindow,
  }

};

export default usePanAndZoom;
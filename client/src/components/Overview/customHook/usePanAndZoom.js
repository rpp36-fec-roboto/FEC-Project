import { useRef, useReducer } from 'react';
import reducer, { initialState } from './reducer.js';
import { pan, startPan, zoomIn, zoomOut } from './actions.js';

const usePanAndZoom = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const containerRef = useRef(null);

  const onMouseMoveInWindow = (event) => {
    event.preventDefault();
    console.log('moving')
    dispatch(pan(event));
  };

  // const onZoomOut = (event) => {
  //   event.preventDefault();
  //   console.log('zoom out');
  //   dispatch(zoomOut(event));
  //   window.removeEventListener('mousemove', onMouseMoveInWindow);
  // }

  // const onZoomIn = (event) => {
  //   event.preventDefault();
  //   console.log('zoom in');
  //   dispatch(zoomIn(event));
  //   dispatch(startPan(event));
  //   window.addEventListener('mousemove', onMouseMoveInWindow);
  //   window.removeEventListener('click', onZoomIn);
  // };

  const zoom = (event) => {
    event.preventDefault();
    if(state.isZoomedIn) {
      console.log('zoom out');
      dispatch(zoomOut(event));
      window.removeEventListener('mousemove', onMouseMoveInWindow);
      // window.removeEventListener('click', onZoomOut);
      // window.addEventListener('click', onZoomIn);
    } else {
      console.log('zoom in');
      dispatch(zoomIn(event));
      dispatch(startPan(event));
      window.addEventListener('mousemove', onMouseMoveInWindow);
      // window.removeEventListener('click', onZoomIn);
      // window.addEventListener('click', onZoomOut);
    }
  };

  return {
    ...state,
    containerRef,
    zoom,
    // onZoomIn,
    // onZoomOut
  }
};

export default usePanAndZoom;
import { types } from './actions.js';

export const initialState = {
  translateX: 0,
  translateY: 0,
  prevMouseX: 0,
  prevMouseY: 0,
  scale: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.PAN_START_AND_ZOOM:
      // containerRef.current.getBoundingClientRect() has height and weight property of the containerRef

      // get center of the image and the translate should be centerX - mouseX and centerY - moustY with scales
      const centerX = action.imgRect.width / 2;
      const centerY = action.imgRect.height / 2;

      console.log(action.clientX, action.clientY);
      console.log(centerX, centerY);
      // const translateX = (centerX - action.clientX) * 2.5;
      // const translateY = (centerY - action.clientY) * 2.5;

      return {
        ...state,
        scale: 2.5,
        translateX: (centerX - action.clientX),
        translateY: (centerY - action.clientY),
        prevMouseX: action.clientX,
        prevMouseY: action.clientY,
      };

    case types.PAN:
      const deltaMouseX = state.prevMouseX - action.clientX;
      const deltaMouseY = state.prevMouseY - action.clientY;
      return {
        ...state,
        translateX: state.translateX + deltaMouseX,
        translateY: state.translateY + deltaMouseY,
        prevMouseX: action.clientX,
        prevMouseY: action.clientY
      }

    default:
      return state;
  }
};

export default reducer;
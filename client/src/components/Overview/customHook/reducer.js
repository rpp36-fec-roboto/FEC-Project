import { types } from './actions.js';

export const initialState = {
  // isInZoomMode: false,
  translateX: 0,
  translateY: 0,
  prevMouseX: 0,
  prevMouseY: 0,
  scale: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.PAN_START_AND_ZOOM:
      return {
        ...state,
        scale: 2.5,
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

    // case types.CHANGE_ZOOM_MODE:
    //   return {
    //     ...state,
    //     isInZoomMode: !state.isInZoomMode
    //   }

    default:
      return state;
  }
};

export default reducer;
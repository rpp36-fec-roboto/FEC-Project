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
    case types.PAN_START:
      return {
        ...state,
        prevMouseX: action.clientX,
        prevMouseY: action.clientY,
      };

    case types.PAN:
      const deltaMouseX = action.clientX - state.prevMouseX;
      const deltaMouseY = action.clientY - state.prevMouseY;
      return {
        ...state,
        translateX: state.translateX + deltaMouseX,
        translateY: state.translateY + deltaMouseY,
        prevMouseX: action.clientX,
        prevMouseY: action.clientY
      }

    case types.ZOOM_IN:
      return {
        ...state,
        isZoomedIn: true,
        scale: 2.5
      }

    default:
      return state;
  }
};

export default reducer;
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

      // get coordinate of the center of the image
      const imgCenter = {
        x: action.containerRect.width / 2,
        y: action.containerRect.height / 2
      }

      // mouse coordinate within the img element
      const mousePositionOnImg = {
        x: action.clientX - action.containerRect.left,
        y: action.clientY - action.containerRect.top
      }

      const currentDistanceToCenter = {
        x: imgCenter.x - mousePositionOnImg.x,
        y: imgCenter.y - mousePositionOnImg.y
      }

      const scaledDistanceToCenter = {
        x: currentDistanceToCenter.x * 2.5,
        y: currentDistanceToCenter.y * 2.5
      }

      const offSet = {
        x: scaledDistanceToCenter.x - currentDistanceToCenter.x,
        y: scaledDistanceToCenter.y - currentDistanceToCenter.y
      }

      return {
        ...state,
        scale: 2.5,
        translateX: offSet.x,
        translateY: offSet.y,
        prevMouseX: action.clientX,
        prevMouseY: action.clientY,
      };

    case types.PAN:
      const imgSize = {
        width: action.containerRect.width,
        height: action.containerRect.height
      }

      const deltaMouse = {
        x: state.prevMouseX - action.clientX,
        y: state.prevMouseY - action.clientY
      }

      const windowSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      var proportionalDeltaMouse = {x: null, y: null};

      if(imgSize.width > imgSize.height) {
        proportionalDeltaMouse.x = deltaMouse.x,
        proportionalDeltaMouse.y = deltaMouse.y * (imgSize.width / imgSize.height)
      } else {
        proportionalDeltaMouse.x = deltaMouse.x * (imgSize.height / imgSize.width),
        proportionalDeltaMouse.y = deltaMouse.y
      }

      return {
        ...state,
        translateX: state.translateX + proportionalDeltaMouse.x,
        translateY: state.translateY + proportionalDeltaMouse.y,
        prevMouseX: action.clientX,
        prevMouseY: action.clientY
      }

    default:
      return state;
  }
};

export default reducer;
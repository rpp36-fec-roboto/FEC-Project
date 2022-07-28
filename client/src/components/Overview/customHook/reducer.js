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

      // get coordinate of the center of the image
      const imgCenter = {
        x: action.imgRect.width / 2,
        y: action.imgRect.height / 2
      }

      // mouse position relative to the img element
      const mousePositionOnImg = {
        x: action.clientX - action.imgRect.left,
        y: action.clientY - action.imgRect.top
      }

      const currentDistanceToCenter = {
        x: mousePositionOnImg.x - imgCenter.x ,
        y: mousePositionOnImg.y - imgCenter.y
      }
      // offset scaled image with distance from mouse position to the center of the image
      const scaledDistanceToCenter = {
        x: currentDistanceToCenter.x * 2.5,
        y: currentDistanceToCenter.y * 2.5
      }

      const offSet = {
        x: currentDistanceToCenter.x - scaledDistanceToCenter.x,
        y: currentDistanceToCenter.y - scaledDistanceToCenter.y
      }

      console.log('mouse distance to center', currentDistanceToCenter);
      console.log('offset', state.translateX + offSet.x, state.translateY + offSet.y);


      return {
        ...state,
        scale: 2.5,
        translateX: offSet.x,
        translateY: offSet.y,
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
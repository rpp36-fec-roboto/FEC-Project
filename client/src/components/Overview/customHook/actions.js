export const types = {
  PAN: 'PAN',
  PAN_START_AND_ZOOM: 'PAN_START_AND_ZOOM',
  // CHANGE_ZOOM_MODE: 'CHANGE_ZOOM_MODE'
};

export const startPanAndZoom = (event) => ({
  type: types.PAN_START_AND_ZOOM,
  clientX: event.clientX,
  clientY: event.clientY
});

export const pan = (event) => ({
  type: types.PAN,
  clientX: event.clientX,
  clientY: event.clientY
});

// export const changeZoomMode = (event) => ({
//   type: types.CHANGE_ZOOM_MODE
// });
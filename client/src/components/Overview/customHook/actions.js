export const types = {
  PAN: 'PAN',
  PAN_START: 'PAN_START',
  ZOOM_IN: 'ZOOM_IN',
};

export const startPan = (event) => ({
  type: types.PAN_START,
  clientX: event.clientX,
  clientY: event.clientY
});

export const pan = (event) => ({
  type: types.PAN,
  clientX: event.clientX,
  clientY: event.clientY
});

export const zoomIn = (event) => ({
  type: types.ZOOM_IN
});
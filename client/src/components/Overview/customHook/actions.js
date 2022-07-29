export const types = {
  PAN: 'PAN',
  PAN_START_AND_ZOOM: 'PAN_START_AND_ZOOM',
};

export const startPanAndZoom = (event, containerRect) => ({
  type: types.PAN_START_AND_ZOOM,
  clientX: event.clientX,
  clientY: event.clientY,
  containerRect: containerRect
});

export const pan = (event, containerRect) => ({
  type: types.PAN,
  clientX: event.clientX,
  clientY: event.clientY,
  containerRect: containerRect
});
export const types = {
  PAN: 'PAN',
  PAN_START_AND_ZOOM: 'PAN_START_AND_ZOOM',
};

export const startPanAndZoom = (event, imgRect) => ({
  type: types.PAN_START_AND_ZOOM,
  clientX: event.clientX,
  clientY: event.clientY,
  imgRect: imgRect
});

export const pan = (event, imgRect) => ({
  type: types.PAN,
  clientX: event.clientX,
  clientY: event.clientY,
  imgRect: imgRect
});
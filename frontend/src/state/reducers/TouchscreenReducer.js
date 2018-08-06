export const TOUCHSCREEN_DETECTED = '[state] Touchscreen detected';

export const touchscreen = (state = false, action) =>
  action.type === TOUCHSCREEN_DETECTED || state;

export const touchscreenDetected = () => (
  {
    type: TOUCHSCREEN_DETECTED,
  }
);

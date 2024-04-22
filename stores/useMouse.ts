export type MouseSourceType = 'mouse' | 'touch' | null;

// -1: not pressed, 0: left mouse button, 1: middle mouse button, 2: right mouse button
export type MouseState = -1 | 0 | 1 | 2;

export type ControlSetting = 'two-button' | 'toggle' | null;

export const useMouse = defineStore('mouseState', () => {
  const mouseState = ref<MouseState>(-1);
  const sourceType = ref<MouseSourceType>(null);
  const setting = ref<ControlSetting>(null);
  const filling = ref(false);

  const onPressed = (event) => {
    mouseState.value = event.button;
  }
  const onReleased = () => {
    mouseState.value = -1;
    filling.value = false;
    sourceType.value = null;
  }

  if (document) {
    document.addEventListener('pointerdown', onPressed);
    document.addEventListener('pointerup', onReleased);
  }

  return {
    mouseState,
    sourceType,
    setting,
    filling,
    onPressed,
    onReleased
  }
});

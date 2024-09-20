import { useLogger } from 'src/composables/logger';

const statusbarDefaultColor = '#5e0040';
const statusbarColor = '#5e0040';

export const useStatusbar = () => {
  const logger = useLogger();

  const setColor = (color: string) => {
    logger.debug(`Setting statusbar color to ${color}`);
    const metaEl = document.querySelector('meta[name="theme-color"]');
    if (metaEl) metaEl.setAttribute('content', color);
  };

  const setDefaultColor = () => {
    setColor(statusbarDefaultColor);
  };

  const colorValues = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ];

  /** get a close color to a given color. */
  const getCloseColor = (color: string) => {
    // we increment the last digit of the color by one unit, except if it is maximum, then we decrement
    const lastDigit = color.slice(-1);
    const currIdx = colorValues.findIndex((el) => el == lastDigit);
    const newIdx = currIdx == colorValues.length ? 0 : currIdx + 1;
    const newLastDigit = colorValues[newIdx];
    return color.slice(0, -1) + newLastDigit;
  };

  const resetColor = () => {
    // resetting the color requires changing the color first to something close and then resetting it to the old color again
    logger.debug('resetting color');
    setColor(getCloseColor(statusbarColor));
    setTimeout(() => setColor(statusbarColor), 500);
  };

  return {
    statusbarColor,
    setColor,
    setDefaultColor,
    resetColor,
  };
};

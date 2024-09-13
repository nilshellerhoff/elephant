const statusbarDefaultColor = '#5e0040';
const statusbarColor = '#5e0040';

export const useStatusbar = () => {
  const setColor = (color: string) => {
    const metaEl = document.querySelector('meta[name="theme-color"]');
    if (metaEl) metaEl.setAttribute('content', color);
  };

  const setDefaultColor = () => setColor(statusbarDefaultColor);

  const resetColor = () => {
    setDefaultColor();
    setColor(statusbarColor);
  };

  return {
    statusbarColor,
    setColor,
    setDefaultColor,
    resetColor,
  };
};

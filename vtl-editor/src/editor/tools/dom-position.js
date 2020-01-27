/**
 *
 * @param {*} el
 */
export const getRelativePos = el => e => {
  const { pageX, pageY } = e;
  const { top, left } = el.getBoundingClientRect();
  return {
    x: pageX - left - window.scrollX,
    y: pageY - top - window.scrollY
  };
};

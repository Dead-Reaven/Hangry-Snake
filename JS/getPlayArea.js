const getPlayArea = () => {
  const field = document.getElementById("game");
  const head = document.getElementById("0");
  return {
    x1: 0,
    x2: field.offsetWidth - head.offsetWidth,
    y1: 0,
    y2: field.offsetHeight - head.offsetHeight,
  };
};
export default getPlayArea;

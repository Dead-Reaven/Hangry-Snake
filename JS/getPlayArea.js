const getPlayArea = () => {
  const field = document.getElementById("game");
  return {
    x1: 0,
    x2: field.offsetWidth,
    y1: 0,
    y2: field.offsetHeight,
  };
};
export default getPlayArea;

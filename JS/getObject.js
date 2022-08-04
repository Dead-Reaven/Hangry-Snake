function createHTML(styleClass, id) {
  const html = document.createElement("div");
  html.setAttribute("class", String(styleClass));
  html.setAttribute("id", String(id));
  document.getElementById("game").appendChild(html);
  return document.getElementById(id);
}

const setPosition = (object, x, y) => {
  object.style = ` 
      top: ${y}px;
      left: ${x}px;`;
};

const getObject = (className = "body", id, xPos = null, yPos = null) => {
  return {
    html: createHTML(className, id),
    id,
    xPos,
    yPos,
  };
};

export { getObject, setPosition };

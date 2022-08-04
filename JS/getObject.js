function createHTML(styleClass, id, xPos, yPos) {
  const html = document.createElement("div");
  html.setAttribute("class", String(styleClass));
  html.setAttribute("id", String(id));
  document.getElementById("game").appendChild(html);
  if (xPos && yPos) {
    html.style = ` 
      top: ${yPos}px;
      left: ${xPos}px;`;
  }
  return document.getElementById(id);
}

const getObject = (className = "body", id, xPos = null, yPos = null) => {
  if (!xPos && !yPos)
    return createHTML((className = "body"), id, (xPos = null), (yPos = null));

  return {
    html: createHTML(className, id, xPos, yPos),
    id,
    xPos,
    yPos,
  };
};

export default getObject ;

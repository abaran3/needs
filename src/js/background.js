const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;
var draw = SVG('background').size(width, height);

const numLinesVert = 20;
const numLinesHoriz = numLinesVert / aspect;

const vertLines = [];
const horizLines = [];

const vertInterval = width / numLinesVert;
const horizInterval = height / numLinesHoriz;
const strokeWidth = 2;
const movementSpeed = 0.5;

function getXPosition(screenCoordX) {
  const h = screenCoordX;
  const center = width / 2.0;
  const angle = ((screenCoordX - center) / width) * Math.PI;

  if (angle > Math.PI / 2.0) {
    return (Math.sin(angle - Math.PI) * width) / 2.0 + center;
  }
  if (angle < -Math.PI / 2.0) {
    return (Math.sin(angle + Math.PI) * width) / 2.0 + center;
  }
  return (Math.sin(angle) * width) / 2.0 + center;
}

function getYPosition(screenCoordY) {
  const h = screenCoordY;
  const center = height / 2.0;
  const angle = ((screenCoordY - center) / height) * Math.PI;

  if (angle > Math.PI / 2.0) {
    return (Math.sin(angle - Math.PI) * height) / 2.0 + center;
  }
  if (angle < -Math.PI / 2.0) {
    return (Math.sin(angle + Math.PI) * height) / 2.0 + center;
  }

  return (Math.sin(angle) * height) / 2.0 + center;
}

for (let index = 0; index < numLinesVert; index++) {
  const xPos = getXPosition(index * vertInterval);
  const line = draw
    .line(xPos, 0, xPos, height)
    .stroke({ width: strokeWidth, color: 'white' });
  vertLines.push(line);
}

// Horiz Lines
for (let index = 0; index < numLinesHoriz; index++) {
  const yPos = getYPosition(index * horizInterval);
  const line = draw
    .line(0, yPos, width, yPos)
    .stroke({ width: strokeWidth, color: 'white' });
  horizLines.push(line);
}

function redrawLines(mouseX, mouseY) {
  const mX = mouseX - 0.5;
  const mY = mouseY - 0.5;

  // Vert Lines
  for (let index = 0; index < numLinesVert; index++) {
    const xPos = getXPosition(
      index * vertInterval + mX * width * movementSpeed
    );
    vertLines[index].x(xPos);
  }
  // Horiz Lines
  for (let index = 0; index < numLinesHoriz; index++) {
    const yPos = getYPosition(
      index * horizInterval + mY * height * movementSpeed
    );
    horizLines[index].y(yPos);
  }
}

$('body').mousemove(function(event) {
  mouseX = event.pageX / width;
  mouseY = event.pageY / height;
  redrawLines(mouseX, mouseY);
});

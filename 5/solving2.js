const fs = require("fs");
const readLine = require("readline");
var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input"),
});

const isLower = (value, letter) => (value === letter ? true : false);

function half(decider, upperBound, lowerBound) {
  if (decider) {
    const upperHalf =
      lowerBound + Math.round(Math.abs(upperBound - lowerBound) / 2);
    const lowerHalf = lowerBound;
    return [upperHalf - 1, lowerHalf];
  } else {
    const upperHalf = upperBound;
    const lowerHalf = upperBound - Math.round((upperBound - lowerBound) / 2);
    return [upperHalf, lowerHalf + 1];
  }
}

var seats = [];

var highest = 0;
lineReader.on("line", function (line) {
  const rowCode = [...line.substring(0, 7)];
  const columnCode = [...line.substring(7, 10)];

  var upperBound = 127;
  var lowerBound = 0;
  rowCode.forEach((element) => {
    [newUpper, newLower] = half(isLower(element, "F"), upperBound, lowerBound);
    upperBound = newUpper;
    lowerBound = newLower;
  });

  const row = isLower(rowCode[rowCode.length - 1], "F")
    ? lowerBound
    : upperBound;

  upperBound = 7;
  lowerBound = 0;
  columnCode.forEach((element) => {
    [newUpper, newLower] = half(isLower(element, "L"), upperBound, lowerBound);
    upperBound = newUpper;
    lowerBound = newLower;
  });

  const column = isLower(columnCode[columnCode.length - 1], "L")
    ? lowerBound
    : upperBound;

  const id = row * 8 + column;

  seats.push({ id: id, pos: [row, column] });

  highest = highest < id ? id : highest;
});

lineReader.on("close", () => {
  const seatIds = seats.map((seat) => seat.id);
  seatIds.forEach((seatId, index) => {
    if (!seatIds.includes(seatId + 1)) {
      console.log(seatId + 1);
    }
  });
});

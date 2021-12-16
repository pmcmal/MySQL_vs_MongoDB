module.exports.calcTime = (initialTime, finalTime) => {
  if (finalTime === undefined) {
    finalTime = Date.now();
  }
  return ((finalTime - initialTime) / 1000) + ' s';
}
module.exports.format = (map) => {
  return `Count: ${map.count} Time ${map.time} `;
}
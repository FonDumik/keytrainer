export function average(array: Array<number>) {
  if (array.length !== 0) {
    let sum = 0;
    for (let elem of array) {
      sum = Number(sum + elem);
    }
    let number = Number(sum / array.length);
    return number.toFixed(2);
  } else {
    return "--";
  }
}

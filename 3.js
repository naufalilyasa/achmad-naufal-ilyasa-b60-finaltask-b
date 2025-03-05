function drawImage(size) {
  if (!(size % 2 === 1 && size >= 5)) {
    return console.log("Ukuran harus bernilai ganjil dan diatas 4.");
  }

  let halfFloor = Math.floor(size / 2);
  let halfCeil = Math.ceil(size / 2);

  console.log(`Pattern ${size}`);

  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      if (i <= 1 && j >= 2 && j <= halfFloor) {
        process.stdout.write("# ");
      } else if (i >= 2 && i <= halfFloor && j >= 1 && j <= halfFloor) {
        process.stdout.write("# ");
      } else if (i === 1 && j > halfCeil && j <= size - 1) {
        process.stdout.write("# ");
      } else if (i >= 2 && i <= halfFloor && j > halfCeil && j <= size) {
        process.stdout.write("# ");
      } else if (i === halfCeil && j === halfCeil) {
        process.stdout.write("# ");
      } else if (i > halfCeil && i <= size - 1 && j >= 1 && j < halfCeil) {
        process.stdout.write("# ");
      } else if (i > halfCeil && i <= size - 1 && j > halfCeil && j <= size) {
        process.stdout.write("# ");
      } else if (i >= size && j > 1 && j <= halfFloor) {
        process.stdout.write("# ");
      } else if (i >= size && j > halfCeil && j <= size - 1) {
        process.stdout.write("# ");
      } else {
        process.stdout.write("* ");
      }
    }
    console.log("");
  }
}

drawImage(5);
drawImage(7);

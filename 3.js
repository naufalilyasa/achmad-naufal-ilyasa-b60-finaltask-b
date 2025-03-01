function drawImage(size) {
  let halfFloor = Math.floor(size / 2);
  let halfCeil = Math.ceil(size / 2);

  console.log(`Pattern ${size}`);
  let patter = "";
  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      if (i === 1 && j >= 2 && j <= halfFloor) {
        process.stdout.write("# ");
      } else if (i >= 2 && i <= halfFloor && j >= 1 && j <= halfFloor) {
        process.stdout.write("# ");
      } else if (i >= 2 && i <= halfFloor && j >= 1 && j <= halfFloor) {
        process.stdout.write("# ");
      } else if (i === halfCeil && j === halfCeil) {
        process.stdout.write("# ");
      } else if (i > halfCeil && j >= i - halfCeil && j < halfCeil) {
        process.stdout.write("# ");
      } else if (i > halfCeil && j > halfCeil && j <= halfFloor + (i - 1)) {
        if (i === size && j === size) {
          process.stdout.write("*");
          continue;
        }
        process.stdout.write("# ");
      } else {
        process.stdout.write("* ");
      }
    }
    console.log("");
  }
}

drawImage(5);
drawImage(9);

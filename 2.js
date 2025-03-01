function bubbleSort(data) {
  let swapped = false;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - i - 1; j++) {
      swapped = false;
      if (data[j] > data[j + 1]) {
        let temp = 0;
        temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }
  }

  console.log("Sorted data: ", data);
}

let arr = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21];

bubbleSort(arr);

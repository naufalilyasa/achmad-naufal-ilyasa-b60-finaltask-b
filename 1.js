function hitungHargaBarang(kualitasBarang, kuantitas) {
  let harga = 0;
  let totalHarga = 0;
  let totalPembayaran = 0;
  let potongan = 0;

  switch (kualitasBarang) {
    case "A":
      harga = 4550;
      totalHarga = harga * kuantitas;
      console.log("Barang A");
      if (kuantitas > 13) {
        potongan = kuantitas * 231;
        totalPembayaran = totalHarga - potongan;
        break;
      }
      totalPembayaran = totalHarga;
      break;
    case "B":
      harga = 5330;
      totalHarga = harga * kuantitas;
      console.log("Barang B");
      if (kuantitas > 7) {
        potongan = totalHarga * 0.23;
        totalPembayaran = totalHarga - potongan;
        break;
      }
      totalPembayaran = totalHarga;
      break;
    case "C":
      harga = 8653;
      totalHarga = harga * kuantitas;
      console.log("Barang C");

      totalPembayaran = totalHarga;
      break;
  }

  console.log("Total Harga Barang: ", totalHarga);
  console.log("Total Potongan: ", potongan);
  console.log("Total Pembayaran: ", totalPembayaran);
}

hitungHargaBarang("A", 14);
hitungHargaBarang("B", 8);
hitungHargaBarang("C", 5);

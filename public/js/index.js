// URL API Quran
const apiURL = "https://equran.id/api/surat";

async function fetchData() {
  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(
        `Gagal melakukan fetch API. Kode status: ${response.status}`
      );
    }

    const data = await response.json();
    const quranData = document.getElementById("quranData");

    data.forEach((surah) => {
      const row = document.createElement("div");
      row.innerHTML = `
            <a href="detail.html?surah=${surah.nomor}" class="bg-green-500 text-white pb-3 pt-2 px-3 flex justify-between items-center rounded-md">
                    <div>
                      <p class="text-lg font-bold"> ${surah.nama_latin}</p>
                      <p class="text-sm font-semibold"> ${surah.arti}</p>
                    </div>
                  
                   <div class="text-right">
                      <p class="text-lg font-bold"> ${surah.nama}</p>
                      <p class="text-sm font-semibold"> ${surah.jumlah_ayat} Ayat</p>
                    </div>
            </a>
            `;
      quranData.appendChild(row);
    });
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error.message}`);
  }
}

// Panggil fungsi untuk mengambil data saat halaman dimuat
fetchData();

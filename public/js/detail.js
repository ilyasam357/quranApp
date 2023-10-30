// Fungsi untuk mendapatkan parameter surah dari URL
function getSurahNumberFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("surah");
}

// Fungsi untuk mengambil data surah dari API berdasarkan nomor surah
async function fetchSurahDetail(surahNumber) {
  const apiURL = `https://equran.id/api/surat/${surahNumber}`;

  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(
        `Gagal melakukan fetch API. Kode status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error.message}`);
  }
}

// Fungsi untuk menampilkan detail surah
async function showSurahDetail() {
  const surahNumber = getSurahNumberFromURL();
  const detailContent = document.getElementById("detail-content");

  // Ambil data surah dari API
  const surahData = await fetchSurahDetail(surahNumber);

  // Buat daftar ayat
  const ayatList = surahData.ayat
    .map((ayat) => {
      return `
        <div class="w-4/5  mx-auto mb-3 bg-green-500  p-5">
              
            <article class="text-right text-2xl  font-medium  text-white leading-arabic">${ayat.ar}</article>
            <div class="flex text-lg text-white font-medium ">
                 <p >${ayat.nomor}.</p>
                 <p >${ayat.idn}</p>
             </div>
        </div>
        `;
    })
    .join("");

  // Tampilkan detail surah
  detailContent.innerHTML = `
    <div class="w-4/5 block  justify-between md:flex mx-auto mb-3 mt-3 bg-green-500 text-white p-5 rounded-xl">
       <div> 
            <h2>${surahData.nama}</h2>
            <p> ${surahData.nama_latin} - ${surahData.arti}</p>
        </div>
        <div>
            <audio src="${surahData.audio}" controls class="mt-3 md:mt-0"></audio>
        </div>
    </div>
        ${ayatList}

    `;
}

// Panggil fungsi untuk menampilkan detail surah saat halaman dimuat
showSurahDetail();

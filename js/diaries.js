function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('show');
}

// Daftar cerita dan file .txt-nya
const ceritaList = [
  { id: 1, judul: "Ruang Milik Gadis Gila", isi: "Diaries/gadis.txt", rahasia: "Diaries/gadisR.txt" },
  { id: 2, judul: "Cerita 2", isi: "cerita2.txt", rahasia: "rahasia2.txt" },
  { id: 3, judul: "Cerita 3", isi: "cerita3.txt", rahasia: "rahasia3.txt" }
];

// Fungsi untuk ambil teks dari .txt
function ambilTeks(path) {
  return fetch(path).then(res => res.text());
}

// Fungsi untuk buat 1 blok cerita
async function tampilkanCerita(cerita) {
  const container = document.getElementById("cerita-container");
  const isi = await ambilTeks(cerita.isi);

  const block = document.createElement("section");
  block.className = "cerita";
  block.innerHTML = `
  <section id="cerita${cerita.id}" class="cerita">
    <h3>${cerita.judul}</h3>
    <div class="teks">${teksToHTML(isi)}</div>
    <img src="ckb.png" class="icon-kaki" onclick="bukaModal('${cerita.rahasia}')">
    <div class="divider">✧ ❖ ✧</div>
  `;
  container.appendChild(block);
}

// Tampilkan semua cerita
ceritaList.forEach(tampilkanCerita);

function teksToHTML(teks) {
  const paragraf = teks
    .split(/\r?\n\s*\r?\n/) // ✅ Deteksi enter-enter di Windows, Linux, dan macOS
    .map(paragraph => `<p>${paragraph.trim()}</p>`)
    .join("");
  return paragraf;
}


// Modal fungsi
function bukaModal(path) {
  const modal = document.getElementById("modal");
  const isiModal = document.getElementById("isi-modal");
  ambilTeks(path).then(teks => {
    isiModal.innerHTML = teksToHTML(teks); // ✅ Pakai innerHTML
    modal.style.display = "block";
  });
}


function tutupModal() {
  document.getElementById("modal").style.display = "none";
}

function scrollKeCerita() {
  const target = document.getElementById("cerita-container");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}



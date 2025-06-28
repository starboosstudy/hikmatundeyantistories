const cerpenList = [
  {
    judul: "Sepeda Motor Bapak",
    gambar: "cerpen/puisini.jpg",
    sinopsisFile: "cerpen/sepedaS.txt",
    isiFile: "cerpen/Sepeda.txt"
  },
  {
    judul: "Gadis dan Rembulan",
    gambar: "assets/gambar2.jpg",
    sinopsisFile: "assets/sinopsis2.txt",
    isiFile: "assets/isi-cerpen-2.txt"
  }
  // Tambah cerpen lain di sini
];

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  updateCerpen();

  // Opsional: allow keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevCerpen();
    if (e.key === "ArrowRight") nextCerpen();
    if (e.key === "Escape") closePopup();
  });
});

function updateCerpen() {
  const cerpen = cerpenList[currentIndex];
  document.getElementById("cerpenJudul").innerText = cerpen.judul;
  document.getElementById("cerpenImage").src = cerpen.gambar;

  // Load sinopsis dari file txt
  fetch(cerpen.sinopsisFile)
    .then(res => res.text())
    .then(text => {
      document.getElementById("cerpenSinopsis").innerText = text;
    })
    .catch(err => {
      document.getElementById("cerpenSinopsis").innerText = "Sinopsis tidak tersedia.";
      console.error("Gagal load sinopsis:", err);
    });

  // Update onclick untuk card
  document.getElementById("cerpenCard").onclick = () => openPopup(cerpen.isiFile);
}

function prevCerpen() {
  currentIndex = (currentIndex - 1 + cerpenList.length) % cerpenList.length;
  updateCerpen();
}

function nextCerpen() {
  currentIndex = (currentIndex + 1) % cerpenList.length;
  updateCerpen();
}

function openPopup(file) {
  fetch(file)
    .then(res => res.text())
    .then(text => {
      document.getElementById("popupContent").innerText = text;
      document.getElementById("popup").classList.add("active");
    })
    .catch(err => {
      document.getElementById("popupContent").innerText = "Cerpen tidak ditemukan.";
      document.getElementById("popup").classList.add("active");
      console.error("Gagal load isi cerpen:", err);
    });
}

function closePopup() {
  document.getElementById("popup").classList.remove("active");
  document.getElementById("popupContent").innerText = "";
}
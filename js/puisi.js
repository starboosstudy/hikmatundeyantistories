const puisiData = [
  { id: "Gadis", title: "Gadis Mati yang Takut Mati" },
  { id: "puisi2", title: "Langkah yang Hilang" }
  // Tambahkan sesuai jumlah puisi kamu
];

// Load Puisi
window.onload = function () {
  const container = document.getElementById("puisi-container");
  const toc = document.getElementById("toc");

  puisiData.forEach((puisi, index) => {
    // Daftar Isi
    const li = document.createElement("li");
    li.textContent = puisi.title;
    li.onclick = () => document.getElementById(puisi.id).scrollIntoView({ behavior: "smooth" });
    toc.appendChild(li);

    // Kontainer Puisi
    const section = document.createElement("section");
    section.id = puisi.id;

    fetch(`puisi/${puisi.id}.txt`)
      .then(res => res.text())
      .then(text => {

        const section = document.createElement("section");
        section.id = puisi.id;
        section.classList.add("puisi-section"); // tambahkan ini!
        section.innerHTML = `
          <img src="bulu.png" class="pena-hias" />
          <h2>${puisi.title}</h2>
          <pre class="puisi">${text}</pre>
          <img src="pena.png" class="pena" style="width: 90px;" onclick="showRahasia('${puisi.id}')" title="klik untuk melihat rahasia"/>
          <div class="divider"></div>
        `;
        container.appendChild(section);
      });
  });
};

// Sidebar
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Rahasia
function showRahasia(id) {
  fetch(`puisi/${id}-rahasia.txt`)
    .then(res => res.text())
    .then(text => {
      document.getElementById("popup-text").innerText = text;
      document.getElementById("popup").style.display = "flex";
    });
}

function closePopup() {
   console.log("Close popup triggered!");
  document.getElementById("popup").style.display = "none";
}

function scrollToPuisi() {
  const target = document.getElementById("puisi-container");
  target.scrollIntoView({ behavior: "smooth" });
}



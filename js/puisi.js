function loadPoem(filename) {
  fetch(`puisi/${filename}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal mengambil puisi.");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("poemContent").textContent = data;
      document.getElementById("poemModal").style.display = "block";
    })
    .catch((error) => {
      document.getElementById("poemContent").textContent = "Puisi tidak ditemukan.";
      document.getElementById("poemModal").style.display = "block";
      console.error(error);
    });
}

function closePoem() {
  document.getElementById("poemModal").style.display = "none";
}

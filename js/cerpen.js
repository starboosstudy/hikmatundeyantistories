const stories = [
  {
    title: "Sepeda Motor Bapak",
    synopsisFile: "cerpen/sepedaS.txt",
    contentFile: "cerpen/Sepeda.txt"
  },
  {
    title: "Kaki Tawaf",
    synopsisFile: "cerpen/tawafS.txt",
    contentFile: "cerpen/tawaf.txt"
  },
  {
    title: "Dream, Close!",
    synopsisFile: "cerpen/dreamS.txt",
    contentFile: "cerpen/dream.txt"
  }
];

let currentIndex = 0;

async function updateStory() {
  const story = stories[currentIndex];
  document.getElementById("title").innerText = story.title;

  try {
    // Fetch sinopsis
    const synRes = await fetch(story.synopsisFile);
    const synopsis = await synRes.text();
    document.getElementById("synopsis").innerText = synopsis;

    // Fetch isi cerpen
    const cerpenRes = await fetch(story.contentFile);
    const cerpen = await cerpenRes.text();
    const formattedText = cerpen
      .split(/\r?\n\s*\r?\n/) // ✅ Deteksi enter-enter di Windows, Linux, dan macOS
      .map(paragraph => `<p>${paragraph.trim()}</p>`)
      .join("");

    // Tampilkan ke modal
    document.getElementById("modalContent").innerHTML = `
      <h2>${story.title}</h2>
      ${formattedText}
      <div style="height: 100px;"></div> <!-- ✅ ruang kosong di bawah -->
    `;
  } catch (error) {
    document.getElementById("synopsis").innerText = "Gagal memuat sinopsis.";
    document.getElementById("modalContent").innerHTML = `
      <h2>${story.title}</h2>
      <p><em>Gagal memuat isi cerpen.</em></p>
    `;
  }
}

function nextStory() {
  currentIndex = (currentIndex + 1) % stories.length;
  updateStory();
}

function prevStory() {
  currentIndex = (currentIndex - 1 + stories.length) % stories.length;
  updateStory();
}

function openModal() {
  updateStory();
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}


async function typeText(element, text, delay = 50) {
  element.innerHTML = "";

  let i = 0;
  function getNextChunk() {
    if (text[i] === "<") {
      // Deteksi tag HTML seperti <br>
      let tag = "";
      while (i < text.length && text[i] !== ">") {
        tag += text[i];
        i++;
      }
      tag += ">";
      i++;
      return tag;
    } else {
      return text[i++];
    }
  }

  return new Promise((resolve) => {
    function type() {
      if (i < text.length) {
        const nextChunk = getNextChunk();
        element.innerHTML += nextChunk;
        setTimeout(type, delay);
      } else {
        resolve();
      }
    }
    type();
  });
}


window.addEventListener("DOMContentLoaded", async () => {
  const title = document.getElementById("mainTitle");
  /*const subtitle = document.getElementById("subtitle");*/

  title.innerHTML = "";
  /*subtitle.innerHTML = "";*/

  await typeText(title, "Welcome, You Are Entering Dey's Mind", 70);
  await new Promise((r) => setTimeout(r, 300));
  /*await typeText(subtitle, "Selamat menjelajahi pikiranku. Aku sarankan kau membawa sepuntung obat anti mual<br>yang digulung dengan sisa-sisa harimu. Barangkali kau muak saat menjelajahi pikiranku .", 40);*/
});

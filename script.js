const gallery = document.getElementById("gallery");

let page = 1;
const limit = 10; // Number of images to load per page
let loading = false;

// Function to fetch images from the API
async function fetchImages() {
  loading = true;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`
    );
    const images = await response.json();
    displayImages(images);
    page++;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
  loading = false;
}

// Function to display images on the page
function displayImages(images) {
  images.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("image-card");
    card.innerHTML = `
      <img src="${image.thumbnailUrl}" alt="${image.title}">
    `;
    gallery.appendChild(card);
  });
}

// Initial load
fetchImages();

// Infinite scrolling
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    !loading
  ) {
    fetchImages();
  }
});

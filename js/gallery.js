const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Собираем картинки только из галереи .gallery-certification
const galleryImages = Array.from(document.querySelectorAll(".gallery-certification img"));
let currentIndex = -1;

// Общий обработчик для открытия
document.querySelectorAll(".gallery-certification img, .diplomas img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;

    // Если клик был по изображению из gallery-certification — запоминаем индекс
    currentIndex = galleryImages.indexOf(img);
  });
});

// Листание влево/вправо только если открыта gallery-certification
nextBtn.addEventListener("click", () => {
  if (currentIndex !== -1) {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex].src;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex !== -1) {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex].src;
  }
});

// Закрытие модалки по кнопке ×
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  currentIndex = -1; // сброс
});

// Закрытие кликом вне изображения
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    currentIndex = -1;
  }
});

// Поддержка стрелок на клавиатуре ← → Esc
document.addEventListener("keydown", (e) => {
  if (modal.style.display === "block") {
    if (e.key === "ArrowRight" && currentIndex !== -1) {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      modalImg.src = galleryImages[currentIndex].src;
    } else if (e.key === "ArrowLeft" && currentIndex !== -1) {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      modalImg.src = galleryImages[currentIndex].src;
    } else if (e.key === "Escape") {
      modal.style.display = "none";
      currentIndex = -1;
    }
  }
});

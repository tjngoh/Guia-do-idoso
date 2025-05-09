function toggleTexto(link) {
    const texto = link.previousElementSibling;
    if (texto.style.display === "none") {
      texto.style.display = "block";
      link.textContent = "Ver menos";
    } else {
      texto.style.display = "none";
      link.textContent = "Ver mais";
    }
  }

  const slides = document.querySelectorAll('.slide');
  let index = 0;

  function trocarSlide() {
    slides.forEach((slide, i) => {
      slide.classList.remove('ativo');
    });
    slides[index].classList.add('ativo');
    index = (index + 1) % slides.length;
  }

  setInterval(trocarSlide, 6000); // 6 segundos
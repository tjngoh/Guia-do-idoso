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


const horizontalSection = document.querySelector(".horizontal");
    const scrollContent = document.querySelector(".scroll-content");

    window.addEventListener("scroll", () => {
      const sectionTop = horizontalSection.offsetTop;
      const sectionHeight = horizontalSection.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight - windowHeight) {
        const scrollDistance = scrollY - sectionTop;
        const maxScroll = sectionHeight - windowHeight;
        const percentage = scrollDistance / maxScroll;
        const translateX = percentage * (scrollContent.scrollWidth - window.innerWidth);
        scrollContent.style.transform = `translateX(-${translateX}px)`;
      }
    }); 
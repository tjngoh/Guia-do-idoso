// Alternar exibição de texto
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

// Slides
const slides = document.querySelectorAll(".slide");
let index = 0;

function trocarSlide() {
  if (slides.length === 0) return;
  slides.forEach((slide) => slide.classList.remove("ativo"));
  slides[index].classList.add("ativo");
  index = (index + 1) % slides.length;
}

setInterval(trocarSlide, 6000); // 6 segundos

// Scroll horizontal
const horizontalSection = document.querySelector(".horizontal");
const scrollContent = document.querySelector(".scroll-content");

if (horizontalSection && scrollContent) {
  window.addEventListener("scroll", () => {
    const sectionTop = horizontalSection.offsetTop;
    const sectionHeight = horizontalSection.offsetHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if (
      scrollY >= sectionTop &&
      scrollY <= sectionTop + sectionHeight - windowHeight
    ) {
      const scrollDistance = scrollY - sectionTop;
      const maxScroll = sectionHeight - windowHeight;
      const percentage = scrollDistance / maxScroll;
      const translateX =
        percentage * (scrollContent.scrollWidth - window.innerWidth);
      scrollContent.style.transform = `translateX(-${translateX}px)`;
    }
  });
}

// Script do formulário
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  const nameInput = document.getElementById("name");
  const idadeInput = document.getElementById("idade");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const idadeError = document.getElementById("idadeError");
  const messageError = document.getElementById("messageError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;

    // Limpa mensagens de erro
    nameError.style.display = "none";
    idadeError.style.display = "none";
    messageError.style.display = "none";

    // Validação de nome
    if (nameInput.value.trim() === "") {
      nameError.textContent = "O nome é obrigatório.";
      nameError.style.display = "block";
      isValid = false;
    }

    // Validação de idade
    const idade = parseInt(idadeInput.value, 10);
    if (!idadeInput.value || isNaN(idade) || idade <= 18 || idade > 100) {
      idadeError.textContent = "Informe uma idade válida.";
      idadeError.style.display = "block";
      isValid = false;
    }

    // Validação da mensagem
    if (messageInput.value.trim().length <= 3) {
      messageError.textContent = "Coloque aqui seu feedback.";
      messageError.style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    // Objeto com os dados
    const feedbackData = {
      name: nameInput.value.trim(),
      idade: idade,
      message: messageInput.value.trim(),
    };

    try {
      const response = await fetch("http://localhost:3000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      let result = {};
      try {
        result = await response.json();
      } catch (jsonError) {
        console.warn("Resposta vazia ou não JSON.");
      }

      if (response.ok) {
        alert("Feedback enviado com sucesso!");
        form.reset();
      } else {
        console.error("Erro ao enviar:", result.error || "Erro desconhecido");
        alert("Erro ao enviar o feedback. Detalhes: " + (result.error || "Erro desconhecido"));
      }
    } catch (err) {
      console.error("Erro de rede ou servidor:", err);
      alert("Erro de rede ao enviar feedback.");
    }
  });
});

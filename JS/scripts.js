const faqCards = document.querySelectorAll('.faq-card');
// auth section Ui element
let historyStack = [];
const formSections = document.querySelectorAll('.form-section');

faqCards.forEach(card => {
  const question = card.querySelector('.faq-question');
  const answer = card.querySelector('.answer');
  const icon = card.querySelector('i');

  question.addEventListener('click', () => {
    const isOpen = answer.style.display === "block";
    answer.style.transition = "display .5s ease-in-out";

    // Close all FAQs if you want accordion style
    faqCards.forEach(c => {
      c.querySelector('.answer').style.display = "none";
      c.querySelector('i').classList.replace('fa-minus', 'fa-plus');
    });

    if (isOpen) {
      answer.style.display = "none";
      icon.classList.replace('fa-minus', 'fa-plus');
    } else {
      answer.style.display = "block";
      icon.classList.replace('fa-plus', 'fa-minus');
    }
  });
});

// auth screen js functionalities
function setActiveSection(id) {
  formSections.forEach(section => section.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function showSection(sectionId) {
  setActiveSection(sectionId)
  historyStack.push(sectionId);
}

function goBack() {
  if (historyStack.length > 1) {
    historyStack.pop();
    let prev = historyStack[historyStack.length - 1];
    showSection(prev);
    historyStack.pop();
  }
}
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  if (mode) {
    showSection(mode);
  } else {
    showSection("signup");
  }
});

const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
  const question = card.querySelector('.faq-question');
  const answer = card.querySelector('.answer');
  const icon = card.querySelector('i');

  question.addEventListener('click', () => {
    const isOpen = answer.style.display === "block";

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

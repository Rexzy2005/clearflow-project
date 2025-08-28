const faqCards = document.querySelectorAll('.faq-card');
// auth section Ui element
let historyStack = ['signup-screen'];
const formSections = document.querySelectorAll('.form-section');

// menu UI elements
const hambugerBtn = document.getElementById('hambuger-btn');
const mobileLinks = document.getElementById('mobileLinks');

// toggle menu js
hambugerBtn.addEventListener('click', () => {
    hambugerBtn.classList.toggle('openmenu');
    mobileLinks.classList.toggle('openmenu');
})



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
function setActiveSection(id){
  formSections.forEach(section => section.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function showSection(sectionId){
  // const currentSection = historyStack[historyStack.length - 1];
  // if(currentSection)
  setActiveSection(sectionId)
  historyStack.push(sectionId);
}

function goBack() {

}






// const codes = document.querySelectorAll('.code');

// codes[0].focus()

// codes.forEach((code, index) => {
//   code.addEventListener('keydown', (e) => {
//     if(e.key >= 0 && e.key <= 9){
//       codes[index].value = ''
//       setTimeout(() => codes[index + 1].focus(), 10);
//     } else if(e.key === "Backspace"){
//       setTimeout(() => codes[index - 1].focus(), 10)
//     }
//   })
// });
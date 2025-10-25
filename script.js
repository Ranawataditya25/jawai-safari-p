let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slider = document.querySelector('.slider');

next.addEventListener('click', function(){
    let slides = document.querySelectorAll('.slides');
    slider.appendChild(slides[0]);
})
prev.addEventListener('click', function(){
    let slides = document.querySelectorAll('.slides');
    slider.prepend(slides[slides.length - 1]);
})

const menu = document.querySelector("#menu");
const nav = document.querySelector(".links");

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    nav.classList.toggle('active');
}

const faqItems = document.querySelectorAll(".faq-item");
const loadMoreBtn = document.getElementById("load-more-btn");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all others first (with animation)
    faqItems.forEach((i) => {
      if (i !== item) {
        i.classList.remove("active");
        const ans = i.querySelector(".faq-answer");
        ans.style.maxHeight = 0;
        ans.style.opacity = 0;
      }
    });

    // Toggle the current one
    if (!isActive) {
      // OPEN
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.opacity = 1;

      // Remove fixed maxHeight after animation for flexibility
      answer.addEventListener(
        "transitionend",
        () => {
          if (item.classList.contains("active")) {
            answer.style.maxHeight = "none";
          }
        },
        { once: true }
      );
    } else {
      // CLOSE (smooth)
      const height = answer.scrollHeight; // capture height
      answer.style.maxHeight = height + "px"; // set it first

      // force reflow to register change
      answer.offsetHeight;

      // then transition to 0
      answer.style.maxHeight = 0;
      answer.style.opacity = 0;

      // remove active *after* animation finishes
      answer.addEventListener(
        "transitionend",
        () => {
          item.classList.remove("active");
        },
        { once: true }
      );
    }
  });
});

// Show 5 FAQs initially
let visibleCount = 10;
faqItems.forEach((item, index) => {
  if (index >= visibleCount) item.classList.add("hidden");
});

// Load more FAQs on click
loadMoreBtn.addEventListener("click", () => {
  const hiddenFaqs = Array.from(faqItems).filter((item) =>
    item.classList.contains("hidden")
  );

  hiddenFaqs.slice(0, 5).forEach((item) => {
    item.classList.remove("hidden");
    item.style.animation = "fadeIn 0.5s ease";
  });

  visibleCount += 5;
  if (visibleCount >= faqItems.length) {
    loadMoreBtn.style.display = "none";
  }
});

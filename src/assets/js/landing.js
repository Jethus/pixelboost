const accordionContainer = document.querySelector(".accordion");
const accordionButtons = document.querySelectorAll(".accordion button");
const tabContainer = document.querySelector(".tab-container");
const tabContents = document.querySelectorAll(".tab-content");
const typingElement = document.querySelector(".typing-text");

let textLength = 0;
let currentText = "";
const words = [
  "web design",
  "accessibility",
  "branding",
  "development",
  "communication",
];
let currentWordIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  startTyping();
});

const startTyping = () => {
  currentText = words[currentWordIndex];
  currentWordIndex = (currentWordIndex + 1) % words.length;
  textLength = 0;
  typingElement.innerHTML = "";
  type();
};

const type = () => {
  typingElement.innerHTML = currentText.slice(0, textLength++);
  if (textLength < currentText.length + 1) {
    setTimeout(type, 60);
  } else {
    setTimeout(startErasing, 1500);
  }
};

const startErasing = () => {
  textLength = currentText.length;
  if (textLength > 0) {
    erase();
  } else {
    setTimeout(startTyping, 500);
  }
};

const erase = () => {
  typingElement.innerHTML = currentText.slice(0, textLength--);
  if (textLength >= 0) {
    setTimeout(erase, 60);
  } else {
    setTimeout(startTyping, 500);
  }
};

// sliding accordion
accordionContainer.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (button) {
    const panel = button.nextElementSibling;
    const isActive = button.classList.contains("active");

    // Close all panels
    accordionButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.nextElementSibling.style.maxHeight = null;
      btn.nextElementSibling.classList.remove("expanded");
    });

    // Open the clicked panel if it was not already active
    if (!isActive) {
      button.classList.add("active");
      panel.style.maxHeight = `${panel.scrollHeight + 30}px`;
      panel.classList.add("expanded");
    }
  }
});

// Tabbed content interactivity
tabContainer.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab-link");
  if (tab) {
    const target = tab.getAttribute("data-tab");

    // Activate clicked tab
    document
      .querySelectorAll(".tab-link")
      .forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");

    // Show the corresponding content and hide others
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
      if (tabContent.id === target) {
        tabContent.classList.add("active");
      }
    });
  }
});

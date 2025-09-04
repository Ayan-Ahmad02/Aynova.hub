document.addEventListener('DOMContentLoaded', () => {
  const text = "AYNOVA";
  const container = document.getElementById("aynova-text");

  // Animation timing
  const perLetterDelay = 0.5;
  const letterDuration = 1.0;
  const underlineDelay = 0.25;
  const underlineDuration = 1.0;
  const extraPause = 0.3;

  // Create letters
  text.split("").forEach((letter, i) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.animationDelay = `${(i * perLetterDelay).toFixed(2)}s`;
    container.appendChild(span);
  });

  // After all letters, show underline
  const totalLetterTime = (text.length - 1) * perLetterDelay + letterDuration;
  setTimeout(() => {
    const underline = document.createElement("div");
    underline.id = "underline";
    container.appendChild(underline);
  }, (totalLetterTime + underlineDelay) * 1000);

  // Hide animation screen after all done
  const totalTime = totalLetterTime + underlineDelay + underlineDuration + extraPause;
  setTimeout(() => {
    document.getElementById("animation-screen").style.display = "none";
    startFreeTrial(); // your timer logic
  }, totalTime * 1000);

  // Play audio automatically
  const audio = document.getElementById("bg-audio");
  if (audio) {
    audio.volume = 1.0;
    audio.play().catch(err => console.log("Autoplay blocked:", err));
  }

  // =========================
  // Settings Toggle Button
  // =========================
  const settingsIcon = document.getElementById("settingsIcon");
  const dropdown = document.querySelector(".dropdown");

  if (settingsIcon && dropdown) {
    settingsIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("show");
    });

    // Close dropdown if clicked outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".settings-container")) {
        dropdown.classList.remove("show");
      }
    });
  }

  // =========================
  // Close QR code modal after payment button click
  // =========================
  const unlockBtn = document.getElementById("unlock-btn");
  const paymentModal = document.getElementById("payment-modal");

  if (unlockBtn && paymentModal) {
    unlockBtn.addEventListener("click", () => {
      paymentModal.style.display = "none"; // Hide modal
      alert("Payment confirmed! Full access unlocked."); // Optional success message
    });
  }
});

// ========================
// sliding bar & hero section 
// ========================

  (function() {
    const slides = document.querySelector('.hero-slides');
    const dots = document.querySelectorAll('.hero-dots .dot');
    const totalSlides = dots.length;
    let currentIndex = 0;
    let slideInterval;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      slides.style.transform = `translateX(-${index * 100 / totalSlides}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      currentIndex = index;
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function startSlideShow() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
      clearInterval(slideInterval);
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        stopSlideShow();
        goToSlide(idx);
        startSlideShow();
      });
    });

    goToSlide(0);
    startSlideShow();
  })();

  // =============================
  //  search input / searchbtn 
  // =============================

// script.js

const searchInput = document.querySelector('.search input[type="text"]');
const searchBtn = document.querySelector('.search button.searchb');

// Select all searchable items by their classes (adjust if needed)
const searchableSelectors = 
[
  '.box', '.box1', '.box2', '.box3', '.box4', '.box5' , '.box6',
  '.box7', '.box8', '.box9', '.box10', '.box11', '.box12' , '.box13',
  '.box14', '.box15', '.box16', '.box17', '.box18', '.box19' , '.box20',
  '.box21','.box22', '.box23' , '.box24',
  '.box25', '.box26', '.box27', '.box28', '.box29', '.box30' , '.box31',
  '.box32'
];
const searchableItems = [];
searchableSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => searchableItems.push(el));
});

// Create or get "no results" message element
let noResults = document.getElementById('noResults');
if (!noResults) {
  noResults = document.createElement('div');
  noResults.id = 'noResults';
  noResults.style.color = 'red';
  noResults.style.textAlign = 'center';
  noResults.style.marginTop = '1em';
  noResults.style.display = 'none';
  noResults.textContent = 'No matching content found.';
  if (searchableItems.length > 0) {
    searchableItems[searchableItems.length - 1].parentNode.appendChild(noResults);
  } else {
    document.body.appendChild(noResults);
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function removeHighlights(element) {
  const marks = element.querySelectorAll('mark');
  marks.forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

function highlightMatches(element, query) {
  if (!query) {
    removeHighlights(element);
    return;
  }
  const regex = new RegExp(escapeRegExp(query), 'gi');

  function highlightNode(node) {
    if (node.nodeType === 3) { // Text node
      const match = node.data.match(regex);
      if (match) {
        const span = document.createElement('mark');
        const matchedText = node.data.substring(match.index, match.index + match[0].length);
        const after = node.splitText(match.index);
        after.data = after.data.substring(match[0].length);
        const highlighted = document.createTextNode(matchedText);
        span.appendChild(highlighted);
        after.parentNode.insertBefore(span, after);
        highlightNode(after);
      }
    } else if (node.nodeType === 1 && node.childNodes && !['SCRIPT', 'STYLE', 'MARK'].includes(node.tagName)) {
      for (let i = 0; i < node.childNodes.length; i++) {
        highlightNode(node.childNodes[i]);
      }
    }
  }

  removeHighlights(element);
  highlightNode(element);
}

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();
  let anyVisible = false;

  searchableItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (query === '' || text.includes(query)) {
      item.style.display = '';
      item.style.color = 'black';
      item.style.backgroundColor = 'white';
      highlightMatches(item, query);
      anyVisible = true;
    } else {
      item.style.display = 'none';
      removeHighlights(item);
    }
  });

  noResults.style.display = anyVisible ? 'none' : '';
}

// Suggestion box setup
const suggestionBox = document.createElement('ul');
suggestionBox.style.position = 'absolute';
suggestionBox.style.backgroundColor = 'white';
suggestionBox.style.border = '1px solid #a30606ff';
suggestionBox.style.borderRadius = '4px';
suggestionBox.style.listStyle = 'none';
suggestionBox.style.padding = '0';
suggestionBox.style.margin = '0';
suggestionBox.style.maxHeight = '150px';
suggestionBox.style.overflowY = 'auto';
suggestionBox.style.width = searchInput.offsetWidth + 'px';
suggestionBox.style.zIndex = '1000';
suggestionBox.style.display = 'none';
document.body.appendChild(suggestionBox);

function positionSuggestionBox() {
  const rect = searchInput.getBoundingClientRect();
  suggestionBox.style.top = (window.scrollY + rect.bottom) + 'px';
  suggestionBox.style.left = (window.scrollX + rect.left) + 'px';
  suggestionBox.style.width = rect.width + 'px';
}
positionSuggestionBox();
window.addEventListener('resize', positionSuggestionBox);
window.addEventListener('scroll', positionSuggestionBox);

// Collect unique searchable words (3+ letters) for suggestions
const suggestionSet = new Set();
searchableItems.forEach(item => {
  const words = item.textContent.toLowerCase().match(/\b\w{3,}\b/g);
  if (words) words.forEach(w => suggestionSet.add(w));
});
const suggestions = Array.from(suggestionSet);

function showSuggestions(query) {
  suggestionBox.innerHTML = '';
  if (!query || query.length < 2) {
    suggestionBox.style.display = 'none';
    return;
  }
  const filtered = suggestions.filter(word => word.startsWith(query.toLowerCase())).slice(0, 10);
  if (filtered.length === 0) {
    suggestionBox.style.display = 'none';
    return;
  }
  filtered.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word;
    li.style.padding = '6px 10px';
    li.style.cursor = 'pointer';
    li.tabIndex = 0;
    li.addEventListener('mousedown', e => {
      e.preventDefault();
      searchInput.value = word;
      suggestionBox.style.display = 'none';
      performSearch();
    });
    li.addEventListener('mouseover', () => {
      li.style.backgroundColor = '#dcc534ff';
    });
    li.addEventListener('mouseout', () => {
      li.style.backgroundColor = 'white';
    });
    suggestionBox.appendChild(li);
  });
  suggestionBox.style.display = 'block';
}

searchBtn.addEventListener('click', performSearch);

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    suggestionBox.style.display = 'none';
    performSearch();
  } else if (e.key === 'ArrowDown') {
    const first = suggestionBox.querySelector('li');
    if (first) first.focus();
  }
});

searchInput.addEventListener('input', () => {
  showSuggestions(searchInput.value.trim());
});

document.addEventListener('click', e => {
  if (!suggestionBox.contains(e.target) && e.target !== searchInput) {
    suggestionBox.style.display = 'none';
  }
});

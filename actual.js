// Dictionary App - Heidi Temba

// -- DOM elements --
const searchForm = document.getElementById("searchForm");
const wordInput = document.getElementById("wInput");
const resultBox = document.getElementById("result");
const errorBox = document.getElementById("error");
const savedWordsList = document.getElementById("favoritesList");
const clearBtn = document.getElementById("clearFavorites");

// -- App data --
let savedWords = JSON.parse(localStorage.getItem("heidiDictionary")) || [];
let lastResult = null;

// -- Init --
document.addEventListener("DOMContentLoaded", () => {
  renderSavedWords();
  addEventListeners();
});

// -- Events --
function addEventListeners() {
  searchForm.addEventListener("submit", searchWord);
  clearBtn.addEventListener("click", clearSavedWords);

  // Arrow key navigation into saved words list
  wordInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" && savedWordsList.children.length > 0) {
      savedWordsList.children[0].focus();
    }
  });
}

// -- Fetch word from API --
async function searchWord(e) {
  e.preventDefault();

  const query = wordInput.value.trim().toLowerCase();

  if (!query) {
    showError("Please enter a word to search.");
    return;
  }

  if (query.length < 2) {
    showError("Please enter at least 2 characters.");
    return;
  }

  try {
    clearError();
    showLoading();

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`"${query}" not found. Try checking the spelling.`);
      }
      throw new Error("Something went wrong. Please try again later.");
    }

    const data = await response.json();
    lastResult = data[0];
    displayWord(lastResult);

  } catch (err) {
    showError(err.message);
    resultBox.innerHTML = "";
  }
}

// -- Build and display word result --
function displayWord(wordData) {
  if (!wordData || !wordData.meanings || wordData.meanings.length === 0) {
    showError("No definitions found for this word.");
    return;
  }

  const phonetic = wordData.phonetics?.find((p) => p.text) || null;
  const audioUrl = wordData.phonetics?.find((p) => p.audio)?.audio || null;
  const alreadySaved = isWordSaved(wordData.word);

  // Build the word header
  let html = `
    <div class="word-header">
      <h2>${wordData.word}</h2>

      ${phonetic
        ? `<span class="pronunciation">${phonetic.text}</span>`
        : `<span class="pronunciation" style="color:#aaa; font-style:italic;">No pronunciation available</span>`
      }

      ${audioUrl ? `
        <div class="audio-controls">
          <audio controls>
            <source src="${audioUrl}" type="audio/mpeg">
            <source src="${audioUrl}" type="audio/wav">
            Your browser does not support the audio element.
          </audio>
        </div>` : ""
      }

      <button
        class="favorite-btn ${alreadySaved ? "favorited" : ""}"
        onclick="toggleSave('${wordData.word}')"
        aria-label="${alreadySaved ? "Remove from favorites" : "Add to favorites"}">
        ${alreadySaved ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  `;

  // Build definitions
  wordData.meanings.forEach((meaning) => {
    html += `<div class="definition-item">
      <div class="part-of-speech">${meaning.partOfSpeech}</div>`;

    meaning.definitions.forEach((def) => {
      html += `
        <div class="definition-group">
          <div class="definition">${def.definition}</div>

          ${def.example
            ? `<div class="example">"${def.example}"</div>`
            : ""
          }

          ${def.synonyms?.length > 0
            ? `<div class="synonyms">
                <strong>Synonyms:</strong>
                ${def.synonyms.map((word) =>
                  `<span class="synonym-tag" onclick="lookupWord('${word}')">${word}</span>`
                ).join("")}
               </div>`
            : `<p style="color:#aaa; font-style:italic; margin-top:0.5rem;">No synonyms available</p>`
          }

          ${def.antonyms?.length > 0
            ? `<div class="synonyms">
                <strong>Antonyms:</strong>
                ${def.antonyms.map((word) =>
                  `<span class="synonym-tag" onclick="lookupWord('${word}')">${word}</span>`
                ).join("")}
               </div>`
            : ""
          }
        </div>`;
    });

    html += `</div>`;
  });

  // Source link
  if (wordData.sourceUrls?.length > 0) {
    html += `
      <div class="source-info">
        <strong style="color:#ffffff;">Source:</strong>
        <a href="${wordData.sourceUrls[0]}" target="_blank" rel="noopener noreferrer">
          View detailed information
        </a>
      </div>`;
  }

  resultBox.innerHTML = html;
  resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  announceToScreenReader(`Definition loaded for ${wordData.word}`);
}

// -- Saved words (favourites) --
function toggleSave(word) {
  const index = savedWords.indexOf(word);

  if (index > -1) {
    savedWords.splice(index, 1);
    announceToScreenReader(`${word} removed from favorites`);
  } else {
    savedWords.push(word);
    announceToScreenReader(`${word} added to favorites`);
  }

  localStorage.setItem("heidiDictionary", JSON.stringify(savedWords));
  renderSavedWords();

  // Refresh the result to update the button state
  if (lastResult?.word === word) {
    displayWord(lastResult);
  }
}

function isWordSaved(word) {
  return savedWords.includes(word);
}

function renderSavedWords() {
  if (savedWords.length === 0) {
    savedWordsList.innerHTML = `
      <p style="color:#ffffff; text-align:center; width:100%;">
        No favorite words yet. Search and save words to see them here!
      </p>`;
    clearBtn.style.display = "none";
    return;
  }

  clearBtn.style.display = "inline-block";
  clearBtn.setAttribute("aria-label", `Clear all ${savedWords.length} saved words`);

  savedWordsList.innerHTML = savedWords.map((word) => `
    <div class="favorite-word"
         onclick="lookupWord('${word}')"
         onkeydown="handlePillKey(event, '${word}')"
         tabindex="0"
         role="button"
         aria-label="Search for ${word}">
      <strong>${word}</strong>
      <button class="remove-favorite"
              onclick="event.stopPropagation(); toggleSave('${word}')"
              aria-label="Remove ${word} from favorites">✕</button>
    </div>
  `).join("");
}

function handlePillKey(e, word) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    lookupWord(word);
  }
}

function clearSavedWords() {
  if (savedWords.length === 0) return;
  if (confirm("Are you sure you want to clear all saved words?")) {
    savedWords = [];
    localStorage.setItem("heidiDictionary", JSON.stringify(savedWords));
    renderSavedWords();
    announceToScreenReader("All saved words cleared");
  }
}

// -- Helper: click a synonym/antonym to search it --
function lookupWord(word) {
  wordInput.value = word;
  searchForm.dispatchEvent(new Event("submit"));
  wordInput.focus();
}

// -- Error display --
function showError(message) {
  errorBox.textContent = message;
  errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

function clearError() {
  errorBox.textContent = "";
}

// -- Loading spinner --
function showLoading() {
  resultBox.innerHTML = `
    <div style="text-align:center; padding:3rem;">
      <div class="loading"></div>
      <p style="margin-top:1rem; color:#fff;">Searching...</p>
    </div>`;
}

// -- Screen reader announcements --
function announceToScreenReader(message) {
  const liveRegion = document.createElement("div");
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");
  liveRegion.className = "visually-hidden";
  liveRegion.textContent = message;
  document.body.appendChild(liveRegion);
  setTimeout(() => document.body.removeChild(liveRegion), 1000);
}

// -- Network status --
window.addEventListener("online", () => {
  if (errorBox.textContent.includes("try again later")) clearError();
});

window.addEventListener("offline", () => {
  showError("No internet connection. Please check your network.");
});

// -- Keyboard shortcuts --
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + K focuses the search input
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    wordInput.focus();
    wordInput.select();
  }
  // Escape blurs or refocuses search
  if (e.key === "Escape") {
    document.activeElement === wordInput
      ? wordInput.blur()
      : wordInput.focus();
  }
});

// -- Dynamic styles for JS-generated elements --
const dynamicStyles = document.createElement("style");
dynamicStyles.textContent = `
  .word-header {
    text-align: center;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }
  .audio-controls { margin: 1rem 0; }
  .definition-group { margin-bottom: 1.5rem; }
  .remove-favorite {
    background: none;
    border: none;
    color: #e74c3c;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.2rem;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  .remove-favorite:hover {
    background: #e74c3c;
    color: white;
    transform: scale(1.1);
  }
  .source-info {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    text-align: center;
  }
  .source-info a {
    color: #ffffff;
    text-decoration: none;
  }
  .source-info a:hover { text-decoration: underline; }
`;
document.head.appendChild(dynamicStyles);
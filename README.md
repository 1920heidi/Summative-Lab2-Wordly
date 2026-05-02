
# Wordly Dictionary SPA

## Overview
Wordly Dictionary is a Single Page Application (SPA) built with HTML, CSS, and JavaScript. It allows users to search for English words, view their definitions, pronunciation, synonyms, and save favorite words for later review.

## Features
- **Search for Words:** Enter a word and fetch its definition, pronunciation, and synonyms from a public dictionary API.
- **Favorites:** Save words to a favorites list for easy revision.
- **Dynamic UI:** All updates happen instantly without page reloads.
- **Error Handling:** User-friendly messages for invalid words or API errors.
- **Responsive Design:** Works well on desktop and mobile devices.
- **Accessible:** Uses ARIA labels and keyboard navigation for usability.
- **Audio Pronunciation:** Listen to word pronunciations when available from the API.
- **Interactive Synonyms/Antonyms:** Click on synonyms and antonyms to instantly search them.
- **Keyboard Shortcuts:** Quick navigation with Ctrl/Cmd+K and Escape key support.
- **Offline Detection:** Automatic network status monitoring with user feedback.
- **Screen Reader Support:** Built-in announcements for accessibility compliance.

## Technologies Used
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (Fetch API, DOM Manipulation, localStorage)
- Free Dictionary API (https://dictionaryapi.dev/)
- Web Audio API for pronunciation playback
- LocalStorage API for data persistence
- Github Pages to get website URL - https://1920heidi.github.io/Summative-Lab2-Wordly/

## How to Run
1. Clone or download this repository - https://github.com/1920heidi/Summative-Lab2-Wordly
2. Open `actual.html` in your web browser.
3. Start interacting with the dictionary browser.

# Deployement
- Heidi's Website URL - Website URL - https://1920heidi.github.io/Summative-Lab2-Wordly/
1. Click on the link to view the website

## Project Structure
- `actual.html` — Main HTML file
- `actual.css` — Stylesheet
- `actual.js` — JavaScript logic
- `Image/` — Background image lives in this folder

## JavaScript Functionality

### Core Features
- **API Integration**: Asynchronous fetch requests to Dictionary API with error handling
- **DOM Management**: Dynamic content rendering and real-time UI updates
- **Event Handling**: Form submissions, click events, and keyboard navigation
- **Data Persistence**: localStorage implementation for favorites management

#### Search & Display System
```javascript
// Handles word lookup with validation and error management
- Input validation (minimum 2 characters)
- API request with proper error handling
- Dynamic HTML generation for word definitions
- Loading states with visual feedback
```

#### Favorites Management
```javascript
// Complete favorites system with localStorage persistence
- Add/remove words from favorites
- Persistent storage across browser sessions
- Dynamic UI updates when favorites change
- Bulk operations (clear all with confirmation)
```

#### Accessibility Implementation
```javascript
// Screen reader and keyboard navigation support
- ARIA live regions for dynamic announcements
- Keyboard shortcuts (Ctrl/Cmd+K, Escape)
- Focus management and tabindex handling
- Visual and auditory feedback for user actions
```

#### Audio Integration
```javascript
// Pronunciation audio playback
- HTML5 audio controls integration
- Multiple audio format support (MP3, WAV)
- Graceful fallback when audio unavailable
```

#### Network & Error Handling
```javascript
// Robust error management system
- Online/offline status detection
- API error handling with user-friendly messages
- Input validation and sanitization
- Graceful degradation for missing data
```

### Event Listeners & Interactions
- **Search Form**: Submit handling with preventDefault
- **Favorites**: Click handlers for add/remove/clear operations
- **Keyboard Navigation**: Arrow keys, Enter, Space, and shortcuts
- **Synonym/Antonym Links**: Dynamic word lookup on click
- **Network Events**: Online/offline status monitoring

- Dictionary API: [Free Dictionary API](https://dictionaryapi.dev/)
- Website URL: 

### License
Work by Heidi Jeruto as an assignment requirement
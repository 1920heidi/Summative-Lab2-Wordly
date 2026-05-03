
# Wordly Dictionary SPA

## Overview
Wordly Dictionary is a Single Page Application (SPA) built with HTML, CSS, and JavaScript. It allows users to search for English words, view their definitions, pronunciation, synonyms, and save favorite words for later review.

## Features
- **Search for Words:** Enter a word and click search.
- **Favorites:** Save words to a favorites by clicking to Add to favourites you can also clear or remove a specific word.
- **Dynamic UI:** Updates happen without page reloads.
- **Error Handling:** Red and error for invalid words.
- **Responsive Design:** Works well on desktop and mobile devices.
- **Audio Pronunciation:** Listen to word pronunciations when available from the API.
- **Interactive Synonyms/Antonyms:** Click on synonyms and antonyms to instantly search them.

## Technologies Used
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (Fetch API, DOM Manipulation, localStorage)
- Free Dictionary API (https://dictionaryapi.dev/)
- Web Audio API for pronunciation playback
- Github Pages to get website URL - https://1920heidi.github.io/Summative-Lab2-Wordly/

## How to Run
1. Clone or download this repository - https://github.com/1920heidi/Summative-Lab2-Wordly
2. Open `index.html` in your web browser.
3. Start interacting with the dictionary browser.

# Deployement
- Heidi's Website URL - Website URL - https://1920heidi.github.io/Summative-Lab2-Wordly/
1. Click on the link to view the website

## Project Structure
- `index.html` — Main HTML file
- `actual.css` — Stylesheet
- `actual.js` — JavaScript logic
- `Images/` — Background image lives in this folder

## JavaScript Functionality

### Core Features
- **API Integration**: Asynchronous fetch requests to Dictionary API with error handling
- **DOM Management**: Dynamic content rendering and real-time UI updates
- **Event Handling**: Form submissions, click events, and keyboard navigation
- **Data Persistence**: localStorage implementation for favorites management

### Html webpage 
- Divided into 3 sections 
- Header
- Body with 3 sections 
    - Section 1 - Search section
    - Section 2 - Favourites section
    - Section 3 - Error handling section
    - Footer

### CSS features
- Responsivity for Phones and Laptop layouts
- Background image
- Section styling
- Hover over button feature
- Search bar, button styling
- Error handling styling
- General styling of page

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

#### Audio Integration
```javascript
// Pronunciation audio playback
- HTML5 audio controls integration
- Multiple audio format support (MP3)
- Graceful fallback when audio unavailable
```

#### Network & Error Handling
```javascript
// Robust error management system
- API error handling with user-friendly messages
```

### Event Listeners & Interactions
- **Search Form**: Submit handling with preventDefault
- **Favorites**: Click handlers for add/remove/clear operations
- **Synonym/Antonym Links**: Dynamic word lookup on click

- Dictionary API: [Free Dictionary API](https://dictionaryapi.dev/)
- Website URL: https://1920heidi.github.io/Summative-Lab2-Wordly/

### License
Work by Heidi Jeruto as an assignment requirement 
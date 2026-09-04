/**
 * Day 20 Mini-Project: Country Facts Explorer
 * REST Countries API Integration (https://restcountries.com/v3.1/name/{country})
 * Features:
 * - Async/await fetch with explicit res.ok check
 * - Try/catch/finally state management (Loading, Success, Friendly Error)
 * - Number formatting (population with commas)
 * - Default load for Ethiopia
 * - DOM construction with document.createElement
 */

// DOM Elements
const searchForm = document.getElementById('search-form');
const countryInput = document.getElementById('country-input');
const factsContainer = document.getElementById('facts-container');

/**
 * Main Async Function to Fetch and Render Country Facts
 * @param {string} countryName 
 */
async function fetchCountryFacts(countryName) {
  if (!countryName || countryName.trim().length === 0) return;

  const query = countryName.trim();

  // 1. STATE 1: LOADING INDICATOR
  renderLoadingState(query);

  try {
    // Call REST Countries API
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`);

    // Explicitly check res.ok (HTTP status 200-299)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Country "${query}" not found. Please check your spelling and try again.`);
      } else {
        throw new Error(`Server returned HTTP Error Status: ${response.status}`);
      }
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No country facts available for this search.");
    }

    // Pick the first matching country object
    const country = data[0];

    // 2. STATE 2: RENDER SUCCESSFUL DATA
    renderCountryCard(country);

  } catch (error) {
    // 3. STATE 3: FRIENDLY ERROR HANDLING
    renderErrorState(error.message || "Failed to fetch country facts. Please check your network connection.");
    console.error("Country Fetch Error:", error);
  } finally {
    // Cleanup actions if needed
  }
}

/**
 * Render State 1: Loading Spinner
 */
function renderLoadingState(query) {
  factsContainer.innerHTML = '';
  
  const loadingBox = document.createElement('div');
  loadingBox.className = 'loading-box';

  const spinner = document.createElement('div');
  spinner.className = 'spinner';

  const message = document.createElement('p');
  message.textContent = `Fetching facts for "${query}"...`;

  loadingBox.appendChild(spinner);
  loadingBox.appendChild(message);
  factsContainer.appendChild(loadingBox);
}

/**
 * Render State 2: Country Facts Card using createElement DOM techniques
 */
function renderCountryCard(country) {
  factsContainer.innerHTML = '';

  // Extract properties safely
  const name = country.name?.common || 'Unknown Country';
  const officialName = country.name?.official || '';
  const capital = (country.capital && country.capital.length > 0) ? country.capital.join(', ') : 'N/A';
  const population = country.population ? country.population.toLocaleString() : 'N/A';
  const region = country.region || 'N/A';
  const subregion = country.subregion || 'N/A';
  const flagUrl = country.flags?.svg || country.flags?.png || '';
  const countryCode = country.cca2 || country.cca3 || '';

  // Currencies formatting
  let currenciesStr = 'N/A';
  if (country.currencies) {
    currenciesStr = Object.values(country.currencies)
      .map(c => `${c.name} (${c.symbol || c.code || ''})`)
      .join(', ');
  }

  // Languages formatting
  let languagesStr = 'N/A';
  if (country.languages) {
    languagesStr = Object.values(country.languages).join(', ');
  }

  // Build Card Container using DOM methods
  const card = document.createElement('article');
  card.className = 'country-card';

  // Left Flag Panel
  const flagSide = document.createElement('div');
  flagSide.className = 'flag-side';

  const flagImg = document.createElement('img');
  flagImg.className = 'flag-img';
  flagImg.src = flagUrl;
  flagImg.alt = `Flag of ${name}`;

  const codeBadge = document.createElement('span');
  codeBadge.className = 'country-code';
  codeBadge.textContent = countryCode;

  flagSide.appendChild(flagImg);
  flagSide.appendChild(codeBadge);

  // Right Details Panel
  const detailsSide = document.createElement('div');
  detailsSide.className = 'details-side';

  const title = document.createElement('h2');
  title.className = 'country-title';
  title.textContent = name;

  const official = document.createElement('p');
  official.className = 'official-name';
  official.textContent = officialName;

  const factsGrid = document.createElement('div');
  factsGrid.className = 'facts-grid';

  // Helper to create fact item
  const createFactItem = (icon, label, value) => {
    const item = document.createElement('div');
    item.className = 'fact-item';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'fact-icon';
    iconSpan.textContent = icon;

    const contentDiv = document.createElement('div');
    
    const labelP = document.createElement('p');
    labelP.className = 'fact-label';
    labelP.textContent = label;

    const valueP = document.createElement('p');
    valueP.className = 'fact-value';
    valueP.textContent = value;

    contentDiv.appendChild(labelP);
    contentDiv.appendChild(valueP);
    item.appendChild(iconSpan);
    item.appendChild(contentDiv);
    return item;
  };

  factsGrid.appendChild(createFactItem('🏛️', 'Capital', capital));
  factsGrid.appendChild(createFactItem('👥', 'Population', population));
  factsGrid.appendChild(createFactItem('🗺️', 'Region', `${region} (${subregion})`));
  factsGrid.appendChild(createFactItem('💰', 'Currencies', currenciesStr));
  factsGrid.appendChild(createFactItem('🗣️', 'Languages', languagesStr));

  detailsSide.appendChild(title);
  detailsSide.appendChild(official);
  detailsSide.appendChild(factsGrid);

  card.appendChild(flagSide);
  card.appendChild(detailsSide);

  factsContainer.appendChild(card);
}

/**
 * Render State 3: Friendly Error Card
 */
function renderErrorState(errorMessage) {
  factsContainer.innerHTML = '';

  const errorCard = document.createElement('div');
  errorCard.className = 'error-card';

  const icon = document.createElement('span');
  icon.textContent = '📍';

  const heading = document.createElement('h3');
  heading.textContent = 'Country Not Found';

  const message = document.createElement('p');
  message.textContent = errorMessage;

  errorCard.appendChild(icon);
  errorCard.appendChild(heading);
  errorCard.appendChild(message);

  factsContainer.appendChild(errorCard);
}

// Search Form Event Listener
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputVal = countryInput.value;
  fetchCountryFacts(inputVal);
});

// INITIAL LOAD: Default to Ethiopia on first load
document.addEventListener('DOMContentLoaded', () => {
  countryInput.value = 'Ethiopia';
  fetchCountryFacts('Ethiopia');
});

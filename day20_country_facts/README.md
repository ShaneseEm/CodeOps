# Country Facts Explorer — Module 2 Day 20 Mini-Project

A responsive single-page web application that allows users to search for facts about any country in the world using live data from the **REST Countries API** (`https://restcountries.com/v3.1/name/{country}`).

---

## 🌟 Key Features

1. **Default Load**: Defaults to showing **Ethiopia's** facts on first load (Capital: *Addis Ababa*, Population: *formatted with commas*).
2. **Search Input**: Live search bar supporting any country name worldwide.
3. **UI State Management**:
   - **Loading State**: Displays a spinning loading indicator while API request is in flight.
   - **Success State**: Builds and renders capital, population (`.toLocaleString()`), region, currencies, languages, and flag SVG into the DOM via `document.createElement`.
   - **Error Handling**: Checks `res.ok` (HTTP status code) and handles network & 404 errors with friendly error feedback.
4. **No Frameworks**: Pure HTML5, CSS3 glassmorphism layout, and Vanilla JavaScript (`async/await`, `fetch`).

---

## 📡 API Information

- **API Used**: [REST Countries API v3.1](https://restcountries.com/)
- **Endpoint**: `https://restcountries.com/v3.1/name/{country}`
- **Method**: `GET`
- **Authentication**: None required (Free Public API)

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/ShaneseEm/CodeOps.git
   ```
2. Open `module-2/day20_country_facts/index.html` directly in any web browser, or serve using Live Server in VS Code.

/**
 * Step 5 — Watchlist: add button (duplicate guard), renderWatchlist(), delegated click listener for removal
 */
function setupWatchlist() {
  const addBtn = document.querySelector("#watch");
  const watchUl = document.querySelector("#watchlist");
  const select = document.querySelector("#currency");

  addBtn.addEventListener("click", () => {
    const c = select.value;
    if (state.watchlist.includes(c)) return;
    state.watchlist.push(c);
    save();
    renderWatchlist();
  });

  watchUl.addEventListener("click", (e) => {
    if (!e.target.matches(".rm")) return;
    const c = e.target.closest("li").dataset.c;
    state.watchlist = state.watchlist.filter(x => x !== c);
    save();
    renderWatchlist();
  });
}

function renderWatchlist() {
  const watchUl = document.querySelector("#watchlist");
  if (!watchUl) return;
  if (state.watchlist.length === 0) {
    watchUl.innerHTML = "<li>No currencies yet</li>";
    return;
  }
  watchUl.innerHTML = state.watchlist.map(c => {
    const r = state.rates[c];
    return `<li data-c="${c}">1 ETB = ${r} ${c} <button class="rm">×</button></li>`;
  }).join("");
}

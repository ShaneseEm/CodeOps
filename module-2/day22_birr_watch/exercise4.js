/**
 * Step 4 — Wire convert form: preventDefault, validate with Number(), look up rate & format result
 */
function wireConvertForm() {
  const form = document.querySelector("#convert-form");
  const amount = document.querySelector("#amount");
  const result = document.querySelector("#result");
  const select = document.querySelector("#currency");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const amt = Number(amount.value);
    if (!amt || amt <= 0) {
      result.textContent = "Enter a valid amount.";
      return;
    }
    state.currency = select.value;
    const rate = state.rates[state.currency];
    const out = (amt * rate).toFixed(2);
    result.textContent = `${amt} ETB = ${out} ${state.currency}`;
  });
}

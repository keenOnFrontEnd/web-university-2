"use strict";

const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getBtn = document.querySelector(".container button");
const exIcon = document.querySelector(".reverse");
const amountEl = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

const API_KEY = "c7e6a56ea0b6ae4497c65d91";

[fromCurrency, toCurrency].forEach((select, i) => {
  for (let curcode in Country_List) {
    const selected =
      (i === 0 && curcode === "USD") || (i === 1 && curcode === "GBP")
        ? "selected"
        : "";

    select.insertAdjacentHTML(
      "beforeend",
      ` <option value="${curcode}" ${selected}>${curcode}</option>`,
    );
  }

  // event in select and option
  select.addEventListener("change", () => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${Country_List[
      code
    ].toLowerCase()}.png`;
  });
});

// get data from api
async function getExchangeRate() {
  const amountValue = amountEl.value;
  exRateTxt.textContent = "Please Wait................";

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency.value}`,
    );
    const result = await response.json();

    const exRate = result.conversion_rates[toCurrency.value];
    const totalExRate = amountValue * exRate.toFixed(2);
    exRateTxt.textContent = `${amountValue} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    console.log(exRate);
  } catch (error) {
    exRateTxt.textContent = "Something Went Wrong";
  }
}

window.addEventListener("DOMContentLoaded", getExchangeRate);
getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

exIcon.addEventListener("click", () => {
  [fromCurrency.value, toCurrency.value] = [
    toCurrency.value,
    fromCurrency.value,
  ];
  [fromCurrency, toCurrency].forEach((select) => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${Country_List[
      code
    ].toLowerCase()}.png`;
  });

  getExchangeRate();
});

amountEl.addEventListener("keyup", () => {
  getExchangeRate();
});
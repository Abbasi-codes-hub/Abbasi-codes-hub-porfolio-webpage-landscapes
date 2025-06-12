const apiKey = '49eca0b57aae332a481b99b3';  // ExchangeRate-API key
const fromSelect = document.querySelector("select[name='from']");
const toSelect = document.querySelector("select[name='to']");
const input = document.querySelector("input");
const msg = document.querySelector(".msg");
const fromImg = document.querySelectorAll(".from .select-container img")[0];
const toImg = document.querySelectorAll(".to .select-container img")[0];

// Assuming countryList already loaded, populating select options
for (let currencyCode in countryList) {
  let option1 = document.createElement("option");
  option1.value = currencyCode;
  option1.innerText = currencyCode;
  fromSelect.appendChild(option1);

  let option2 = document.createElement("option");
  option2.value = currencyCode;
  option2.innerText = currencyCode;
  toSelect.appendChild(option2);
}

// Default selections
fromSelect.value = "USD";
toSelect.value = "INR";

// Update flags based on currency code mapping
function updateFlag(select, imgElement) {
  let countryCode = countryList[select.value];
  imgElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

fromSelect.addEventListener("change", () => {
  updateFlag(fromSelect, fromImg);
  getExchangeRate();
});

toSelect.addEventListener("change", () => {
  updateFlag(toSelect, toImg);
  getExchangeRate();
});

input.addEventListener("input", () => {
  getExchangeRate();
});

function getExchangeRate() {
  let fromCurrency = fromSelect.value;
  let toCurrency = toSelect.value;
  let amount = parseFloat(input.value);

  if (isNaN(amount) || amount <= 0) {
    msg.innerText = "Please enter a valid amount.";
    return;
  }

  // Fetch exchange rates from ExchangeRate-API
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`)
    .then(res => res.json())
    .then(data => {
      if (data.result !== "success") {
        msg.innerText = "API error: " + (data['error-type'] || 'Unknown error');
        return;
      }
      let rate = data.conversion_rates[toCurrency];
      if (!rate) {
        msg.innerText = `Exchange rate not available for ${toCurrency}`;
        return;
      }
      let total = (amount * rate).toFixed(2);
      msg.innerText = `${amount} ${fromCurrency} = ${total} ${toCurrency}`;
    })
    .catch(() => {
      msg.innerText = "Fetching rate failed.";
    });
}

// Initial calls
getExchangeRate();
updateFlag(fromSelect, fromImg);
updateFlag(toSelect, toImg);

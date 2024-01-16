const container = document.querySelector(".container");
const fromCurr = document.querySelector("#fromCurr");
const toCurr = document.querySelector("#toCurr");
const fromAmt = document.querySelector("#fromAmt");
const toAmt = document.querySelector("#toAmt");
const fromFlag = document.querySelector(".fromFlag");
const toFlag = document.querySelector(".toFlag");
const result = document.querySelector(".result");

// add countryList
for (key in countryList) {
    // from
    var new1 = document.createElement("option");
    new1.value = key;
    new1.innerText = key;
    fromCurr.append(new1);
    // to
    var new2 = document.createElement("option");
    new2.value = key;
    new2.textContent = key;
    toCurr.append(new2);
    // default
    fromCurr.value = "USD";
    toCurr.value = "INR";

    // calling updateFlag function
    fromCurr.addEventListener("change", () => {
        fromFlag.src = updateFlag(fromCurr.value);
    });

    toCurr.addEventListener("change", () => {
        toFlag.src = updateFlag(toCurr.value);
    });
}

// updateFlag function
function updateFlag(curr) {
    console.log("curr");
    let code = countryList[curr];
    let newSrc = `https://flagsapi.com/${code}/flat/64.png`;
    return newSrc;
}

// fetching API, calculation for converting currency
const convert = async () => {
    let amount = parseFloat(fromAmt.value);
    if (amount < 1 || amount === "") {
        amount = 1;
        fromAmt.value = "1";
    }
    const fromCurrency = fromCurr.value;
    const toCurrency = toCurr.value;
    result.innerText = "Fetching Exchange Rates...";

    try {
        // fetch data from API
        const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const data = await response.json();

        const conversionRate = data.rates[toCurrency];
        const convertedAmt = (amount * conversionRate).toFixed(2);

        // selected country is available
        if (typeof conversionRate === "undefined") {
            result.innerText =
                "Exchange rate data for Selected Country is NOT available...";
            toCurr = "";
        } else {
            toAmt.value = convertedAmt;
            result.innerText = `1 ${fromCurrency} = ${data.rates[toCurrency]} ${toCurrency}`;
        }
    } catch (error) {
        container.innerHTML = `<h2>Error while fetching exchange rates !!!</h2>`;
    }
};

// eventListeners
fromAmt.addEventListener("input", convert);
fromCurr.addEventListener("change", convert);
toAmt.addEventListener("input", convert);
toCurr.addEventListener("change", convert);
window.addEventListener("load", convert);
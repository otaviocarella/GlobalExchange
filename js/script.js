const API_KEY = '6c160b4fafce5cda837cd92f';

const currencies = ["USD", "EUR", "GBP", "BRL", "JPY", "AUD", "CAD", "CHF"];

const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultDiv = document.getElementById("result");
const amountInput = document.getElementById("amount");
let exchangeChart;

function populateDropdowns() {
    currencies.forEach(currency => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.textContent = currency;
        toSelect.appendChild(optionTo);
    });
    fromSelect.value = "USD";
    toSelect.value = "BRL";
}

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            const rate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            gsap.fromTo("#result", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 });
        } else {
            resultDiv.textContent = "Erro ao obter a taxa de câmbio.";
        }
    } catch (error) {
        resultDiv.textContent = "Erro na conexão com a API.";
        console.error("Erro:", error);
    }
}

async function fetchChartData() {
    try {
        const currencyUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
        const currencyResponse = await fetch(currencyUrl);
        const currencyData = await currencyResponse.json();

        const selectedCurrencies = ["EUR", "GBP", "BRL", "JPY"];
        const currencyRates = selectedCurrencies.map(cur => currencyData.conversion_rates[cur]);

        const cryptoUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";
        const cryptoResponse = await fetch(cryptoUrl);
        const cryptoData = await cryptoResponse.json();

        const bitcoinPrice = cryptoData.bitcoin.usd;
        const ethereumPrice = cryptoData.ethereum.usd;

        const labels = [...selectedCurrencies, "BTC", "ETH"];
        const dataValues = [...currencyRates, bitcoinPrice, ethereumPrice];

        const ctx = document.getElementById("exchangeChart").getContext("2d");
        if (exchangeChart) exchangeChart.destroy();

        exchangeChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Valor (em USD ou equivalente)",
                    data: dataValues,
                    backgroundColor: "rgba(255, 215, 0, 0.6)",
                    borderColor: "rgba(255, 215, 0, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        type: "logarithmic",
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: "Valor (Escala Logarítmica)"
                        },
                        ticks: {
                            callback: function (value) {
                                return Number(value.toString());
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.dataset.label + ": " + context.parsed.y;
                            }
                        }
                    }
                }
            }
        });

        gsap.from("#grafico", { opacity: 0, duration: 1, delay: 0.5, ease: "power2.out" });

    } catch (error) {
        console.error("Erro ao buscar dados para o gráfico:", error);
    }
}

function initAnimations() {
    gsap.from("header", { y: -50, opacity: 0, duration: 1 });
    gsap.from(".section h1", { opacity: 0, y: 20, duration: 1, stagger: 0.3 });
}

function init() {
    populateDropdowns();
    initAnimations();
    fetchChartData();
}

document.addEventListener("DOMContentLoaded", init);
convertBtn.addEventListener("click", convertCurrency);
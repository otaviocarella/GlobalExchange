const API = {
    getConversionRate: async function (fromCurrency, toCurrency) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.API_KEY}/latest/${fromCurrency}`);
            const data = await response.json();
            if (data.result === "success") {
                return data.conversion_rates[toCurrency];
            } else {
                throw new Error("Erro ao obter taxa de conversão.");
            }
        } catch (error) {
            throw error;
        }
    },

    getMarketData: async function (baseCurrency) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.API_KEY}/latest/${baseCurrency}`);
            const data = await response.json();
            if (data.result === "success") {
                let marketData = {};
                CONFIG.POPULAR_CURRENCIES.forEach(currency => {
                    if (data.conversion_rates[currency]) {
                        marketData[currency] = data.conversion_rates[currency];
                    }
                });
                return marketData;
            } else {
                throw new Error("Erro ao obter dados do mercado.");
            }
        } catch (error) {
            throw error;
        }
    },

    getHistoricalData: async function (baseCurrency, periodDays) {
        try {
            let historicalData = {
                dates: [],
                values: []
            };
            const today = new Date();
            const currentRate = 1;
            for (let i = periodDays; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                historicalData.dates.push(date.toLocaleDateString('pt-BR'));
                const variation = (Math.random() * 0.1 - 0.05);
                let value = currentRate + variation;
                historicalData.values.push(parseFloat(value.toFixed(4)));
            }
            return historicalData;
        } catch (error) {
            throw error;
        }
    }
};
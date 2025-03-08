let currencyChart;

const ChartModule = {
    initChart: async function () {
        const ctx = document.getElementById('currency-chart').getContext('2d');
        const baseCurrencySelect = document.getElementById('chart-base-currency');
        const baseCurrency = baseCurrencySelect.value;
        const period = 7;
        const historicalData = await API.getHistoricalData(baseCurrency, period);

        currencyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: historicalData.dates,
                datasets: [{
                    label: `Taxa (${baseCurrency})`,
                    data: historicalData.values,
                    borderColor: CONFIG.CHART_COLORS[0],
                    backgroundColor: CONFIG.CHART_COLORS[0],
                    fill: false,
                    tension: 0.3
                }]
            },
            options: CONFIG.CHART_OPTIONS
        });
    },

    updateChart: async function () {
        const baseCurrencySelect = document.getElementById('chart-base-currency');
        const baseCurrency = baseCurrencySelect.value;
        const periodButtons = document.querySelectorAll('.time-period-selector button');
        let period = 7;
        periodButtons.forEach(btn => {
            if (btn.classList.contains('active')) {
                period = parseInt(btn.getAttribute('data-period'));
            }
        });
        const historicalData = await API.getHistoricalData(baseCurrency, period);

        currencyChart.data.labels = historicalData.dates;
        currencyChart.data.datasets[0].data = historicalData.values;
        currencyChart.data.datasets[0].label = `Taxa (${baseCurrency})`;
        currencyChart.update();
    },

    setupChartControls: function () {
        document.getElementById('chart-base-currency').addEventListener('change', function () {
            ChartModule.updateChart();
        });

        const periodButtons = document.querySelectorAll('.time-period-selector button');
        periodButtons.forEach(button => {
            button.addEventListener('click', function () {
                periodButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                ChartModule.updateChart();
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', function () {
    ChartModule.initChart();
    ChartModule.setupChartControls();
});
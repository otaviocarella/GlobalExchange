document.addEventListener('DOMContentLoaded', function () {
    particlesJS('particles-js', CONFIG.PARTICLES_OPTIONS);

    UI.populateCurrencyLists();
    UI.setupCustomSelects();

    document.getElementById('convert-button').addEventListener('click', async function () {
        const amountInput = document.getElementById('amount');
        const amount = parseFloat(amountInput.value) || 0;

        const fromDisplay = document.getElementById('from-currency-display');
        const toDisplay = document.getElementById('to-currency-display');

        const fromCurrency = fromDisplay.querySelector('span').textContent.split(' - ')[0];
        const toCurrency = toDisplay.querySelector('span').textContent.split(' - ')[0];

        UI.showLoader();

        try {
            const rate = await API.getConversionRate(fromCurrency, toCurrency);
            const convertedValue = (amount * rate).toFixed(4);
            UI.updateResult(amount, fromCurrency, convertedValue, toCurrency, rate.toFixed(4));
            UI.hideLoader();
            HistoryModule.addHistoryItem({
                date: Utils.formatDateTime(new Date()),
                fromCurrency: fromCurrency,
                fromValue: amount,
                toCurrency: toCurrency,
                toValue: convertedValue,
                rate: rate.toFixed(4)
            });
            Utils.showNotification("Conversão realizada com sucesso!", "success");
        } catch (error) {
            UI.hideLoader();
            Utils.showNotification("Erro na conversão. Tente novamente.", "error");
            console.error(error);
        }
    });

    document.getElementById('swap-button').addEventListener('click', function () {
        const fromDisplay = document.getElementById('from-currency-display');
        const toDisplay = document.getElementById('to-currency-display');
        const tempHTML = fromDisplay.innerHTML;
        fromDisplay.innerHTML = toDisplay.innerHTML;
        toDisplay.innerHTML = tempHTML;
    });

    document.querySelector('.notification-close').addEventListener('click', function () {
        document.getElementById('notification').classList.remove('show');
    });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(section => {
        observer.observe(section);
    });

    document.getElementById('theme-toggle').addEventListener('change', function () {
        document.body.classList.toggle('dark-theme');
    });
});

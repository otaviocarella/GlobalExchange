const UI = {
    populateCurrencyLists: function () {
        const fromList = document.getElementById('from-currency-list');
        const toList = document.getElementById('to-currency-list');

        CONFIG.POPULAR_CURRENCIES.forEach(currency => {
            const listItemFrom = document.createElement('div');
            listItemFrom.className = 'select-item';
            listItemFrom.setAttribute('data-currency', currency);
            const flagCode = CURRENCY_FLAGS[currency] || 'us';
            listItemFrom.innerHTML = `<img src="https://flagcdn.com/w20/${flagCode}.png" alt="${currency}" class="flag-icon">
                <span>${currency} - ${CURRENCY_NAMES[currency] || currency}</span>`;
            fromList.appendChild(listItemFrom);

            const listItemTo = listItemFrom.cloneNode(true);
            toList.appendChild(listItemTo);
        });
    },

    setupCustomSelects: function () {
        const fromSelectDisplay = document.getElementById('from-currency-display');
        const fromList = document.getElementById('from-currency-list');

        fromSelectDisplay.addEventListener('click', function () {
            fromList.classList.toggle('hidden');
        });

        fromList.addEventListener('click', function (e) {
            if (e.target.closest('.select-item')) {
                const item = e.target.closest('.select-item');
                const currency = item.getAttribute('data-currency');
                const flagCode = CURRENCY_FLAGS[currency] || 'us';
                fromSelectDisplay.innerHTML = `<img src="https://flagcdn.com/w20/${flagCode}.png" alt="${currency}" class="flag-icon">
                    <span>${currency} - ${CURRENCY_NAMES[currency] || currency}</span>`;
                fromList.classList.add('hidden');
            }
        });

        const toSelectDisplay = document.getElementById('to-currency-display');
        const toList = document.getElementById('to-currency-list');

        toSelectDisplay.addEventListener('click', function () {
            toList.classList.toggle('hidden');
        });

        toList.addEventListener('click', function (e) {
            if (e.target.closest('.select-item')) {
                const item = e.target.closest('.select-item');
                const currency = item.getAttribute('data-currency');
                const flagCode = CURRENCY_FLAGS[currency] || 'us';
                toSelectDisplay.innerHTML = `<img src="https://flagcdn.com/w20/${flagCode}.png" alt="${currency}" class="flag-icon">
                    <span>${currency} - ${CURRENCY_NAMES[currency] || currency}</span>`;
                toList.classList.add('hidden');
            }
        });

        document.addEventListener('click', function (e) {
            if (!fromSelectDisplay.contains(e.target) && !fromList.contains(e.target)) {
                fromList.classList.add('hidden');
            }
            if (!toSelectDisplay.contains(e.target) && !toList.contains(e.target)) {
                toList.classList.add('hidden');
            }
        });
    },

    showLoader: function () {
        document.getElementById('loader').classList.remove('hidden');
        document.getElementById('result').classList.add('hidden');
    },

    hideLoader: function () {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
    },

    updateResult: function (fromValue, fromCurrency, toValue, toCurrency, rate) {
        document.getElementById('result-value').textContent = toValue;
        document.getElementById('result-currency').textContent = toCurrency;
        document.getElementById('from-amount').textContent = `${fromValue} ${fromCurrency}`;
        document.getElementById('rate').textContent = `${rate} ${toCurrency}`;
        document.getElementById('updated-time').textContent = Utils.formatDateTime(new Date());
    }
};

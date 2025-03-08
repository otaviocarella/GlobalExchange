const HistoryModule = {
    historyKey: 'conversionHistory',

    getHistory: function () {
        return Utils.readFromLocalStorage(this.historyKey) || [];
    },

    addHistoryItem: function (item) {
        let history = this.getHistory();
        history.unshift(item);
        if (history.length > CONFIG.MAX_HISTORY_ITEMS) {
            history = history.slice(0, CONFIG.MAX_HISTORY_ITEMS);
        }
        Utils.saveToLocalStorage(this.historyKey, history);
        this.renderHistory();
    },

    clearHistory: function () {
        Utils.saveToLocalStorage(this.historyKey, []);
        this.renderHistory();
    },

    renderHistory: function () {
        const historyContainer = document.getElementById('history-items');
        historyContainer.innerHTML = '';

        const history = this.getHistory();
        if (history.length === 0) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-history';
            emptyDiv.innerHTML = `<i class="fas fa-history"></i>
                <p>Seu histórico de conversões aparecerá aqui</p>`;
            historyContainer.appendChild(emptyDiv);
            return;
        }

        history.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-column">${item.date}</div>
                <div class="history-column">${item.fromCurrency} ${item.fromValue}</div>
                <div class="history-column">${item.toCurrency} ${item.toValue}</div>
                <div class="history-column">${item.rate}</div>
                <div class="history-column">
                    <button class="delete-history" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            historyContainer.appendChild(historyItem);
        });
    },

    exportHistory: function () {
        const history = this.getHistory();
        if (history.length === 0) {
            Utils.showNotification("Histórico vazio para exportar.", "info");
            return;
        }
        const rows = [
            ['Data/Hora', 'De', 'Valor Origem', 'Para', 'Valor Destino', 'Taxa']
        ];
        history.forEach(item => {
            rows.push([item.date, item.fromCurrency, item.fromValue, item.toCurrency, item.toValue, item.rate]);
        });
        Utils.exportToCSV('historico_conversoes.csv', rows);
    },

    setupHistoryEvents: function () {
        document.getElementById('clear-history').addEventListener('click', function () {
            HistoryModule.clearHistory();
            Utils.showNotification("Histórico limpo.", "success");
        });

        document.getElementById('export-history').addEventListener('click', function () {
            HistoryModule.exportHistory();
        });

        document.getElementById('history-items').addEventListener('click', function (e) {
            if (e.target.closest('.delete-history')) {
                const index = e.target.closest('.delete-history').getAttribute('data-index');
                let history = HistoryModule.getHistory();
                history.splice(index, 1);
                Utils.saveToLocalStorage(HistoryModule.historyKey, history);
                HistoryModule.renderHistory();
                Utils.showNotification("Item removido do histórico.", "success");
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', function () {
    HistoryModule.renderHistory();
    HistoryModule.setupHistoryEvents();
});

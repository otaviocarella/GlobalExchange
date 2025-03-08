const Utils = {
    formatCurrency: function (value, currency) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency
        }).format(value);
    },

    formatDateTime: function (date) {
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    showNotification: function (message, type = 'success') {
        const notification = document.getElementById('notification');
        if (!notification) {
            console.warn("Elemento de notificação não encontrado!");
            return;
        }
        const notificationIcon = notification.querySelector('.notification-icon');
        const notificationMessage = notification.querySelector('.notification-message');
        notification.className = 'notification';
        if (type === 'success') {
            notification.classList.add('notification-success');
            notificationIcon.className = 'fas fa-check-circle';
        } else if (type === 'error') {
            notification.classList.add('notification-error');
            notificationIcon.className = 'fas fa-exclamation-circle';
        } else if (type === 'info') {
            notification.classList.add('notification-info');
            notificationIcon.className = 'fas fa-info-circle';
        }
        notificationMessage.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, CONFIG.NOTIFICATION_TIMEOUT);
    },

    saveToLocalStorage: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    readFromLocalStorage: function (key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    exportToCSV: function (filename, rows) {
        const processRow = function (row) {
            return row.map(item => `"${item}"`).join(',');
        };

        let csvContent = "";
        rows.forEach(row => {
            csvContent += processRow(row) + "\n";
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement("a");
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
};
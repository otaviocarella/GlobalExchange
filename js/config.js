const CONFIG = {
    API_KEY: '6c160b4fafce5cda837cd92f',
    API_BASE_URL: 'https://v6.exchangerate-api.com/v6/',
    POPULAR_CURRENCIES: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'BRL'],
    DEFAULT_FROM_CURRENCY: 'BRL',
    DEFAULT_TO_CURRENCY: 'USD',
    REFRESH_INTERVAL: 60 * 60 * 1000,
    MAX_HISTORY_ITEMS: 10,

    PARTICLES_OPTIONS: {
        particles: {
            number: {
                value: 30,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#5469d4"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#5469d4",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                push: {
                    particles_nb: 3
                }
            }
        },
        retina_detect: true
    },

    CHART_OPTIONS: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8
                }
            },
            tooltip: {
                backgroundColor: 'rgba(42, 53, 106, 0.8)',
                padding: 12,
                usePointStyle: true
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    callback: function (value) {
                        return value.toFixed(4);
                    }
                }
            }
        },
        elements: {
            line: {
                tension: 0.4
            },
            point: {
                radius: 3,
                hoverRadius: 5
            }
        }
    },

    CHART_COLORS: [
        'rgba(84, 105, 212, 1)',
        'rgba(56, 178, 172, 1)',
        'rgba(237, 137, 54, 1)',
        'rgba(72, 187, 120, 1)',
        'rgba(66, 153, 225, 1)',
        'rgba(159, 122, 234, 1)',
        'rgba(245, 101, 101, 1)',
        'rgba(246, 173, 85, 1)'
    ],

    NOTIFICATION_TIMEOUT: 3000
};

const CURRENCY_NAMES = {
    'AED': 'Dirham dos Emirados Árabes Unidos',
    'ARS': 'Peso Argentino',
    'AUD': 'Dólar Australiano',
    'BRL': 'Real Brasileiro',
    'CAD': 'Dólar Canadense',
    'CHF': 'Franco Suíço',
    'CLP': 'Peso Chileno',
    'CNY': 'Yuan Chinês',
    'COP': 'Peso Colombiano',
    'CZK': 'Coroa Tcheca',
    'DKK': 'Coroa Dinamarquesa',
    'EUR': 'Euro',
    'GBP': 'Libra Esterlina',
    'HKD': 'Dólar de Hong Kong',
    'HUF': 'Florim Húngaro',
    'IDR': 'Rupia Indonésia',
    'ILS': 'Novo Shekel Israelense',
    'INR': 'Rupia Indiana',
    'JPY': 'Iene Japonês',
    'KRW': 'Won Sul-Coreano',
    'MXN': 'Peso Mexicano',
    'MYR': 'Ringgit Malaio',
    'NOK': 'Coroa Norueguesa',
    'NZD': 'Dólar Neozelandês',
    'PEN': 'Sol Peruano',
    'PHP': 'Peso Filipino',
    'PLN': 'Zloty Polonês',
    'RON': 'Leu Romeno',
    'RUB': 'Rublo Russo',
    'SAR': 'Riyal Saudita',
    'SEK': 'Coroa Sueca',
    'SGD': 'Dólar de Singapura',
    'THB': 'Baht Tailandês',
    'TRY': 'Lira Turca',
    'TWD': 'Novo Dólar Taiwanês',
    'USD': 'Dólar Americano',
    'UYU': 'Peso Uruguaio',
    'VND': 'Dong Vietnamita',
    'ZAR': 'Rand Sul-Africano',
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'XRP': 'Ripple',
    'LTC': 'Litecoin',
    'BCH': 'Bitcoin Cash',
    'BNB': 'Binance Coin',
    'USDT': 'Tether',
    'ADA': 'Cardano',
    'DOT': 'Polkadot',
    'XLM': 'Stellar'
};

const CURRENCY_FLAGS = {
    'AED': 'ae',
    'ARS': 'ar',
    'AUD': 'au',
    'BRL': 'br',
    'CAD': 'ca',
    'CHF': 'ch',
    'CLP': 'cl',
    'CNY': 'cn',
    'COP': 'co',
    'CZK': 'cz',
    'DKK': 'dk',
    'EUR': 'eu',
    'GBP': 'gb',
    'HKD': 'hk',
    'HUF': 'hu',
    'IDR': 'id',
    'ILS': 'il',
    'INR': 'in',
    'JPY': 'jp',
    'KRW': 'kr',
    'MXN': 'mx',
    'MYR': 'my',
    'NOK': 'no',
    'NZD': 'nz',
    'PEN': 'pe',
    'PHP': 'ph',
    'PLN': 'pl',
    'RON': 'ro',
    'RUB': 'ru',
    'SAR': 'sa',
    'SEK': 'se',
    'SGD': 'sg',
    'THB': 'th',
    'TRY': 'tr',
    'TWD': 'tw',
    'USD': 'us',
    'UYU': 'uy',
    'VND': 'vn',
    'ZAR': 'za'
};

const CRYPTO_CURRENCIES = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH', 'BNB', 'USDT', 'ADA', 'DOT', 'XLM'];
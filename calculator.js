document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const resetBtn = document.getElementById('resetBtn');
    const themeIcon = document.querySelector('.theme-icon');

    // Load theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    }

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    });

    // Mode switching
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const mode = btn.dataset.mode;
            document.querySelectorAll('.mode-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(mode).classList.add('active');
        });
    });

    // Mode 1: What is X% of Y?
    const whatIsX = document.getElementById('whatIsX');
    const whatIsY = document.getElementById('whatIsY');
    const whatIsResult = document.getElementById('whatIsResult');
    const whatIsBreakdown = document.getElementById('whatIsBreakdown');

    function calculateWhatIs() {
        const x = parseFloat(whatIsX.value);
        const y = parseFloat(whatIsY.value);

        if (!isNaN(x) && !isNaN(y) && y !== 0) {
            const result = (x / 100) * y;
            whatIsResult.value = result.toFixed(4);
            whatIsBreakdown.textContent = `(${x}% ÷ 100) × ${y} = ${result.toFixed(4)}`;
        } else {
            whatIsResult.value = '';
            whatIsBreakdown.textContent = 'Enter values to see breakdown';
        }
    }

    whatIsX.addEventListener('input', calculateWhatIs);
    whatIsY.addEventListener('input', calculateWhatIs);

    // Mode 2: X is what % of Y?
    const xIsX = document.getElementById('xIsX');
    const xIsY = document.getElementById('xIsY');
    const xIsResult = document.getElementById('xIsResult');
    const xIsBreakdown = document.getElementById('xIsBreakdown');

    function calculateXIs() {
        const x = parseFloat(xIsX.value);
        const y = parseFloat(xIsY.value);

        if (!isNaN(x) && !isNaN(y) && y !== 0) {
            const result = (x / y) * 100;
            xIsResult.value = result.toFixed(2) + '%';
            xIsBreakdown.textContent = `(${x} ÷ ${y}) × 100 = ${result.toFixed(2)}%`;
        } else {
            xIsResult.value = '';
            xIsBreakdown.textContent = 'Enter values to see breakdown';
        }
    }

    xIsX.addEventListener('input', calculateXIs);
    xIsY.addEventListener('input', calculateXIs);

    // Mode 3: Percentage Change
    const changeOriginal = document.getElementById('changeOriginal');
    const changeNew = document.getElementById('changeNew');
    const changeResult = document.getElementById('changeResult');
    const changeBreakdown = document.getElementById('changeBreakdown');

    function calculatePercentChange() {
        const original = parseFloat(changeOriginal.value);
        const newVal = parseFloat(changeNew.value);

        if (!isNaN(original) && !isNaN(newVal) && original !== 0) {
            const difference = newVal - original;
            const percentChange = (difference / original) * 100;
            const sign = percentChange >= 0 ? '+' : '';
            changeResult.value = sign + percentChange.toFixed(2) + '%';
            changeBreakdown.textContent = `((${newVal} - ${original}) ÷ ${original}) × 100 = ${sign}${percentChange.toFixed(2)}%`;
        } else {
            changeResult.value = '';
            changeBreakdown.textContent = 'Enter values to see breakdown';
        }
    }

    changeOriginal.addEventListener('input', calculatePercentChange);
    changeNew.addEventListener('input', calculatePercentChange);

    // Mode 4: Tax Calculator
    const taxAmount = document.getElementById('taxAmount');
    const taxRate = document.getElementById('taxRate');
    const taxValue = document.getElementById('taxValue');
    const taxTotal = document.getElementById('taxTotal');
    const taxBreakdown = document.getElementById('taxBreakdown');

    function calculateTax() {
        const amount = parseFloat(taxAmount.value);
        const rate = parseFloat(taxRate.value);

        if (!isNaN(amount) && !isNaN(rate)) {
            const tax = (rate / 100) * amount;
            const total = amount + tax;
            taxValue.value = tax.toFixed(2);
            taxTotal.value = total.toFixed(2);
            taxBreakdown.textContent = `(${rate}% ÷ 100) × ${amount} = ${tax.toFixed(2)} tax | Total: ${total.toFixed(2)}`;
        } else {
            taxValue.value = '';
            taxTotal.value = '';
            taxBreakdown.textContent = 'Enter values to see breakdown';
        }
    }

    taxAmount.addEventListener('input', calculateTax);
    taxRate.addEventListener('input', calculateTax);

    // Mode 5: Profit/Loss Calculator
    const profitCost = document.getElementById('profitCost');
    const profitSelling = document.getElementById('profitSelling');
    const profitAmount = document.getElementById('profitAmount');
    const profitPercent = document.getElementById('profitPercent');
    const profitBreakdown = document.getElementById('profitBreakdown');

    function calculateProfit() {
        const cost = parseFloat(profitCost.value);
        const selling = parseFloat(profitSelling.value);

        if (!isNaN(cost) && !isNaN(selling) && cost !== 0) {
            const amount = selling - cost;
            const percent = (amount / cost) * 100;
            const sign = amount >= 0 ? '+' : '';
            const status = amount >= 0 ? 'Profit' : 'Loss';
            profitAmount.value = sign + amount.toFixed(2);
            profitPercent.value = sign + percent.toFixed(2) + '%';
            profitBreakdown.textContent = `Selling: ${selling} - Cost: ${cost} = ${sign}${amount.toFixed(2)} (${status}) | ${sign}${percent.toFixed(2)}%`;
        } else {
            profitAmount.value = '';
            profitPercent.value = '';
            profitBreakdown.textContent = 'Enter values to see breakdown';
        }
    }

    profitCost.addEventListener('input', calculateProfit);
    profitSelling.addEventListener('input', calculateProfit);

    // Reset all
    resetBtn.addEventListener('click', () => {
        whatIsX.value = '';
        whatIsY.value = '';
        whatIsResult.value = '';
        whatIsBreakdown.textContent = 'Enter values to see breakdown';

        xIsX.value = '';
        xIsY.value = '';
        xIsResult.value = '';
        xIsBreakdown.textContent = 'Enter values to see breakdown';

        changeOriginal.value = '';
        changeNew.value = '';
        changeResult.value = '';
        changeBreakdown.textContent = 'Enter values to see breakdown';

        taxAmount.value = '';
        taxRate.value = '';
        taxValue.value = '';
        taxTotal.value = '';
        taxBreakdown.textContent = 'Enter values to see breakdown';

        profitCost.value = '';
        profitSelling.value = '';
        profitAmount.value = '';
        profitPercent.value = '';
        profitBreakdown.textContent = 'Enter values to see breakdown';
    });
});
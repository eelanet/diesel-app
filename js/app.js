$(document).foundation();

// document.getElementById('price-diesel').value = '1.35';
// document.getElementById('price-gas').value = '1.55';
// document.getElementById('consumption-diesel').value = '5.5';
// document.getElementById('consumption-gas').value = '7.5';
// document.getElementById('tax-diesel').value = '620';
// document.getElementById('tax-gas').value = '210';
// document.getElementById('km-year').value = '30000';

/**
 * Diesel and Gas total costs barchart
 */
let ctx = document.getElementById('myChart').getContext('2d');
let costsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Diesel', 'Bensa'],
        datasets: [{
            label: 'Ajoneuvovero',
            data: [0, 0],
            backgroundColor: [
                'rgba(57, 64, 91, 1)',
                'rgba(57, 64, 91, 1)'
            ],
            borderColor: [
                'rgba(23, 97, 160, 1)',
                'rgba(23, 97, 160, 1)'
            ],
            borderWidth: 3
        },
        {
            label: 'Polttoaine',
            data: [0, 0],
            backgroundColor: [
                'rgba(23, 97, 160, 0.2)',
                'rgba(23, 97, 160, 0.2)'
            ],
            borderColor: [
                'rgba(23, 97, 160, 1)',
                'rgba(23, 97, 160, 1)'
            ],
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        },
        beginAtZero: true,
        title: {
            display: true,
            text: 'Kustannukset',
            fontSize: 18
        },
    }
});

let btnCalculate = document.getElementById('btn-calculate');

btnCalculate.addEventListener('click', getValues);

function getValues() {
    let formIDs = ['price-diesel', 'price-gas', 'consumption-diesel', 'consumption-gas', 'tax-diesel', 'tax-gas', 'km-year'];
    let formValues = [];

    for (let i = 0; i < formIDs.length; i++) {
        // Modify values and push them to an array
        formValues.push(parseFloat(document.getElementById(formIDs[i]).value.replace(',', '.').replace(/\s/g, '')));
    }
    checkValues(formValues);
}

function checkValues(formValues) {
    let priceDi = formValues[0];
    let priceGas = formValues[1];
    let consumptionDi = formValues[2];
    let consumptionGas = formValues[3];
    let taxDi = formValues[4];
    let taxGas = formValues[5];
    let kmYear = formValues[6];

    if (priceDi && priceGas && consumptionDi && consumptionGas && taxDi && taxGas && kmYear) {
        calculateCosts(priceDi, priceGas, consumptionDi, consumptionGas, taxDi, taxGas, kmYear);
    } else {
        alert('Täytä kaikki vaadittavat tiedot ensin.');
        document.getElementById('costs-results').style.display = 'none';
    }
}

function calculateCosts(priceDi, priceGas, consumptionDi, consumptionGas, taxDi, taxGas, kmYear) {
    let costsDi = 0;
    let costsGas = 0;
    let totalDi = 0;
    let totalGas = 0;

    // Total costs Diesel
    costsDi = priceDi * consumptionDi * (kmYear / 100);
    totalDi = costsDi + taxDi;
    totalDi = Math.round(totalDi);
    document.getElementById('costs-diesel').value = totalDi;

    // Total costs Gasoline
    costsGas = priceGas * consumptionGas * (kmYear / 100);
    totalGas = costsGas + taxGas;
    totalGas = Math.round(totalGas);
    document.getElementById('costs-gas').value = totalGas;

    // Total costs difference
    if (totalDi < totalGas) {
        document.getElementById('costs-difference-label').innerText = 'Dieselauto on halvempi';
        document.getElementById('costs-difference').value = totalGas - totalDi;
    } else if (totalGas < totalDi) {
        document.getElementById('costs-difference-label').innerText = 'Bensa-auto on halvempi';
        document.getElementById('costs-difference').value = totalDi - totalGas;
        document.getElementById('title-boolean').style.color = '#cc4c4c';
        document.getElementById('title-boolean').innerText = 'Ei';
    } else {
        document.getElementById('costs-difference').value = 0;
        document.getElementById('title-boolean').style.color = '#cc4c4c';
        document.getElementById('title-boolean').innerText = 'Ei';
    }
    updateChart(costsDi, costsGas, taxDi, taxGas);

    // Display results
    document.getElementById('costs-results').style.removeProperty('display');
}

// Update chart
function updateChart(costsDi, costsGas, taxDi, taxGas) {
    costsChart.data.datasets[0].data = [Math.round(taxDi), Math.round(taxGas)];
    costsChart.data.datasets[1].data = [Math.round(costsDi), Math.round(costsGas)];
    costsChart.update();
}


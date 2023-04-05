let labels = [];
let baseStats = [];
let statsChart;


function renderStats(currentIndex) {
    let statsTabPane = document.getElementById('stats-tab-pane')
    statsTabPane.innerHTML = /*html*/`
        <canvas id="stats"></canvas>
    `;
    const ctx = document.getElementById('stats');
    statsChart = new Chart(ctx, {
        type: 'bar',
        data: getData(currentIndex),
        options: getOptions(),
    });
}


function getData(j) {
    let stats = pokemons[j]['stats'];

    for (let s = 0; s < stats.length; s++) {
        const label = stats[s]['stat']['name'];
        labels.push(label);
        const stat = stats[s]['base_stat'];
        baseStats.push(stat);

    }

    let data = {
        labels: labels,
        datasets: [
            {
                label: '',
                data: baseStats,
                fill: true,
                backgroundColor: ['blue', 'red', 'green', 'yellow', 'purple', 'orange'],
                borderWidth: 1
            }
        ]
    }

    return data;
}


function getOptions() {
    let options = {
        indexAxis: 'y',
        plugins: {
            aspectRatio: 2,
            responsive: true,
            legend: {
                display: false
            }
        }
    }
    return options;
}


function resetChart() {
    let statsTabPane = document.getElementById('stats-tab-pane')
    if (statsChart) {
        statsChart.destroy();
        statsTabPane.innerHTML = '';
        labels = [];
        baseStats = [];
    }
}
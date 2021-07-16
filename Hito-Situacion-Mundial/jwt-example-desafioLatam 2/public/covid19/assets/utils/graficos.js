//se crea una función que recibe los países y sus datos para entonces crear un gráfico
const chartGlobal = (local, country) => {

    //se almacena los datos para desplegarlos en el gráfico
    const chartDatos = {
        labels: local,
        datasets: [
            {
                label: 'casos activos',
                data: country.map((element) => element.active),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'casos confirmados',
                data: country.map((element) => element.confirmed),
                borderColor: 'rgb(255, 205, 86)',
                backgroundColor: 'rgb(255, 205, 86)',
            },
            {
                label: 'casos muertos',
                data: country.map((element) => element.deaths),
                borderColor: 'rgb(201, 203, 207)',
                backgroundColor: 'rgb(201, 203, 207)',
            },
            {
                label: 'casos recuperados',
                data: country.map((element) => element.recovered),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(75, 192, 192)',
            }
        ],
    };

    //se crea un gráfico de barra para mostrar sólo los países con más casos activos
    const ctx = document.getElementById('covidChart');
    new Chart(ctx, {
        type: 'bar',
        data: chartDatos,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: "Países con Covid-19",
                    font: {
                        size: 20,
                    }
                },                
            },
            scales: {
                x:{
                    min: 0,
                    max: 77,
                }

            }
        },
    });
}

//esta variable deja el espacio para el gráfico vacío antes de llamar la función chartCountry
let chartPais = null;

//se crea una función que recibe los datos de cada país y en seguida se crea el gráfico
const chartCountry = (data) => {        
    const chartDatos = {
        labels: ['casos activos', 'casos confirmados', 'casos muertos', 'casos recuperados'],
        datasets: [
            {                
                data: [data.active, data.confirmed, data.deaths, data.recovered],
                borderColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(201, 203, 207)', 'rgb(75, 192, 192)'], 
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(201, 203, 207)', 'rgb(75, 192, 192)'],
            },            
        ],
    };

    const ctx = document.getElementById('covidPais');

    //para posibilitar el cambio de gráfico entre los países, es necesario ocupar el método destroy para "excluir" el gráfico anterior y permitir desplegar un nuevo 
    if (chartPais) {
        chartPais.destroy();
    };
    
    chartPais = new Chart(ctx, {
        type: 'pie',
        data: chartDatos,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',                    
                },
                title: {
                    display: false,                   
                },
            },
        },
    });
};

export { chartGlobal, chartCountry }
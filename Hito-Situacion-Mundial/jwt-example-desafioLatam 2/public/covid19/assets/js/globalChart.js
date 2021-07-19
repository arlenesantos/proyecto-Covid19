//se crea una función que recibe los países y sus datos para entonces crear un gráfico
export const chartGlobal = (local, country) => {

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
};

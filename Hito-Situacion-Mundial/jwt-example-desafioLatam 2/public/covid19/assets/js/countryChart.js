//esta variable deja el espacio para el gráfico vacío antes de llamar la función chartCountry
let chartPais = null;

//se crea una función que recibe los datos de cada país y en seguida se crea el gráfico
export const chartCountry = async (data) => {  
    let objLength= Object.keys(data); //base lógica para determinar el tipo de gráfico a mostrar según el API consumida
    let chartDatos=null;
    if(objLength.length==3){
        chartDatos = {
            labels: ['casos confirmados', 'casos muertos', 'casos recuperados'],
            datasets: [
                {                
                    data: [data.confirmed, data.deaths, data.recovered],
                    borderColor: ['rgb(255, 205, 86)', 'rgb(201, 203, 207)', 'rgb(75, 192, 192)'], 
                    backgroundColor: ['rgb(255, 205, 86)', 'rgb(201, 203, 207)', 'rgb(75, 192, 192)'],
                },            
            ],
        };
    }else{
        chartDatos = {
            labels: ['casos activos', 'casos confirmados', 'casos muertos', 'casos recuperados'],
            datasets: [
                {                
                    data: [data.active, data.confirmed, data.deaths, data.recovered],
                    borderColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(201, 203, 207)', 'rgb(75, 192, 192)'], 
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(201, 203, 207)', 'rgb(75, 192, 192)'],
                },            
            ],
        };
    }

    const ctx = document.getElementById('covidPais');

    //para posibilitar el cambio de gráfico entre los países, es necesario ocupar el método destroy para "excluir" el gráfico anterior y permitir desplegar un nuevo 
    if (chartPais)chartPais.destroy();
    
    chartPais = new Chart(ctx, {
        type: 'pie',
        data: chartDatos,
        options: {
            responsive: false,
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
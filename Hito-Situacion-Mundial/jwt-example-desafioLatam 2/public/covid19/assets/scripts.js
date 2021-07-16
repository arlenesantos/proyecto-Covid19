/*
//token
const postData = async (email,password) => {
    try{
        const response = await fetch ("http://localhost:3000/api/login", 
        {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
        });
        const { token } = await response.json();
        console.log(token)
        localStorage.setItem('jwt-token', token); 
        //return token;

    } catch (error){
        console.error(`Error: ${error}`);
    }
};
*/

//se consume la API
const getData = async () => {
    const response = await fetch("http://localhost:3000/api/total");
    const info = await response.json();
    const data = info.data;        
    return data;
};

//se filtra los países con más de 10.000 casos 
const filterCountries = async () => {
    const data = await getData();
    const country = data.filter((cases) => {
        return cases.active > 10000;       
    }); 
    console.log(country)   
    return country;

}

//a partir de los países filtrados, se obtiene un array con los nombres de los países. Tal array será ocupado en la propiedad 'labels' del gráfico
const getCountry = async () => {
    var local = [];
    const data = await filterCountries();
    data.map((element) => {
        local.push(element.location);
    });
    return local;
}

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

//se agrega puntos en los números
const numberWithDots = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//se despliega toda la información de la API en una tabla
const showTable = (country) =>{    
    country.forEach((element) => {
    document.getElementById("dataTable").innerHTML +=   
        `<tr>
         <th scope="row">${element.location}</th>
         <td>${numberWithDots(element.active)}</td>
         <td>${numberWithDots(element.confirmed)}</td>
         <td>${numberWithDots(element.deaths)}</td>
         <td>${numberWithDots(element.recovered)}</td>
         <td data-toggle="modal" data-target="#modal"><button id="${element.location}" type="button" class="btn btn-outline-secondary">Ver detalle</button></td>         
         </tr>`
    }); 
};

//se agrega un evento listener en cada link/botón para acceder al modal
const activeBtn = (country) => {
    country.forEach(element => {        
        document.getElementById(`${element.location}`).addEventListener("click", () => {
            document.querySelector(".modal-title").innerHTML = "";
            document.querySelector(".modal-title").innerHTML = element.location;
            getDataModal(element.location);                        
        }); 
    });
}

//se consume la API para el gráfico por país
const getDataModal = async (country) => { 
    //verificar problema en la API para países com espaço como: South Africa, una posible solución seria:     
    //country.replace(' ', '%20');  
    const response = await fetch(`http://localhost:3000/api/countries/${country}`);
    const { data } = await response.json();    
    chartCountry(data);
};

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

//se aplica una IIFE para ejecutar la aplicación inmediatamente
const init = (async () => {
    const total = await getData();
    const country = await filterCountries();
    const local = await getCountry();
    chartGlobal(local, country);
    showTable(total);
    activeBtn(total);    
})();
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

const filterCountries = async () => {
    const data = await getData();
    const country = data.filter((cases) => {
        return cases.active > 1000000; // confirmar numero pq con 10000 = 74 cases        
    });
    return country;
}

const getCountry = async () => {
    var local = [];
    const data = await filterCountries();
    data.map((element) => {
        local.push(element.location);
    });
    return local;
}

const numberWithDots = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const renderTable = (countries) => {
    const table = document.getElementById("tableBody");
    countries.forEach( country => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
        <th scope="row">${numberWithDots(country.location)}</th>
        <td>${numberWithDots(country.active)}</td>
        <td>${numberWithDots(country.confirmed)}</td>
        <td>${numberWithDots(country.deaths)}</td>
        <td>${numberWithDots(country.recovered)}</td>
        <td data-toggle="modal" data-target="#modal"><button id="${country.location}" type="button" class="btn btn-secondary">Ver detalle</button></td>
        `;
        table.appendChild(tr);
    })

    // Muestra la Tabla que estaba escondida
    const mainTable = document.getElementById("mainTable");
    mainTable.classList.remove("d-none");
}

let myChartPais = null;
const chartPais = (country) => {
        
    const chartDatos = {
        labels: ['Activos', 'Confirmados', 'Muertos', 'Recuperados'], 
        datasets: [
            {
                label: '# de casos',
                data: [country.active, country.confirmed, country.deaths, country.recovered],
                borderColor: 'red',
                backgroundColor: ['red','yellow', 'gray', 'green'],
            }
        ],
    };
    
    const ctx = document.getElementById('covidPais').getContext('2d');

    if (myChartPais) {
        myChartPais.destroy();
    }
    
    myChartPais = new Chart(ctx, {
        type: 'bar',
        data: chartDatos,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
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
        },
    });
}

const activarModal = async (country) => {
    const response = await fetch(`http://localhost:3000/api/countries/${country}`);
    const { data } = await response.json();

    const modalTitle = document.querySelector(".modal-title");
    modalTitle.innerHTML = `${data.location}`;
    chartPais(data)
}

const mainTable = document.getElementById("mainTable");
mainTable.addEventListener('click', (event) => {
    if(event.target.nodeName === 'BUTTON') activarModal(event.target.id)
})

const init = async () => {
    const country = await filterCountries();
    const local = await getCountry();
    renderTable(country)
    chart(local, country);
}

const chart = (local, country) => {

    //se almacena los datos para desplegarlos en el gráfico
    const chartDatos = {
        labels: local,
        datasets: [
            {
                label: 'casos activos',
                data: country.map((element) => element.active),
                borderColor: 'red',
                backgroundColor: 'red',
            },
            {
                label: 'casos confirmados',
                data: country.map((element) => element.confirmed),
                borderColor: 'yellow',
                backgroundColor: 'yellow',
            },
            {
                label: 'casos muertos',
                data: country.map((element) => element.deaths),
                borderColor: 'gray',
                backgroundColor: 'gray',
            },
            {
                label: 'casos recuperados',
                data: country.map((element) => element.recovered),
                borderColor: 'green',
                backgroundColor: 'green',
            }
        ],
    };

    //se crea un gráfico de barra para mostrar sólo los países con más de 10.000 casos activos
    const ctx = document.getElementById('covidChart').getContext('2d');
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
        },
    });
}



//Modal
$('#showModal').on("click", () => {
    $('#modal').modal('show');
});


init();


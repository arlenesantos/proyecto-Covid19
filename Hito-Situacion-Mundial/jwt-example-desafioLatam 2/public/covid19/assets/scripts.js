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
    return country;
};

var countryTable=[];

const filterCountriesTable = async () => {
    const data = await getData();
    countryTable = data.filter((cases) => {
        return cases.active > 10000; // Se filtra para llenar info en la tabla      
    });
    return countryTable;
};

//DOM a tabla y botones de tablas
const tabla=document.querySelector('#dataTable');
const btnPreview=document.querySelector('#btn_preview');
const btnNext=document.querySelector('#btn_next');
const currentPage=document.querySelector('#current_page')
const $modal=$('#modal');
var modalTitle=document.querySelector('.modal-title')
var btnsModal=document.querySelectorAll('button .btn-modal');

//Variables principales utilizadas al momento de pintar paginación de la tabla
var initData=0;
var range=9;
var page=1;

//Modifica variables de control de paginación
btnPreview.addEventListener('click',()=>{
    if(initData<10||range<10){
        initData=0;
        range=9;
        page=1;
        btnPreview.disabled=true;
    }else{
        initData-=10;
        range-=10;
        page-=1;
    };

    //Lógica de activación de botones
    if(page<Math.floor((countryTable.length/10)+1))btnNext.disabled=false;

    tabla.innerHTML="";
    currentPage.innerText=`Página : 0${page}`;
    fillTable(countryTable);
});
btnNext.addEventListener('click',()=>{
    if(range>countryTable.length-10){
        initData=countryTable.length - 10;
        range=countryTable.length-1;
        page=Math.floor((countryTable.length/10)+1);
        btnNext.disabled=true;
    }else{
        initData+=10;
        range+=10;
        page+=1;
    };

    //Lógica de activación de botones
    if(page>1)btnPreview.disabled=false;
    
    tabla.innerHTML="";
    currentPage.innerText=`Página : 0${page}`;
    fillTable(countryTable);
});

//Lógica de activación de botones
if(page>1)btnPreview.disabled=false;
if(page<Math.floor((countryTable.length/10)+1))btnPreview.disabled=false;

//se despliega toda la información de la API en una tabla con paginación incluida
const fillTable=(data)=>{
    for(i=initData;i<=range;i++){
        let tr=document.createElement('tr')
        tr.innerHTML=`
        <th scope="row">${data[i].location}</th>
        <td>${numberWithDots(data[i].active)}</td>
        <td>${numberWithDots(data[i].confirmed)}</td>
        <td>${numberWithDots(data[i].deaths)}</td>
        <td>${numberWithDots(data[i].recovered)}</td>
        <td><button class="button btn-modal btn-success" id="${data[i].location}">Ver detalle</button></td>
        `
        tabla.appendChild(tr)
    };
    btnsModal=document.querySelectorAll('.btn-modal');
    btnsModal.forEach((element)=>{
        element.addEventListener('click',async (e)=>{
            let local_url=e.target.id;
            let dataLocal=await getDataModal(local_url);
            if(dataLocal.hasOwnProperty('data')){
                let dataPath=dataLocal.countryModified;
                modalTitle.innerText= dataPath; //Se cambia el nombre del modal por país
                chartCountry(dataLocal.data[dataPath]);
                $modal.modal('toggle',()=>{
                });
            }else{
                modalTitle.innerText=await dataLocal.location; //Se cambia el nombre del modal por país
                chartCountry(dataLocal);
                $modal.modal('toggle',()=>{
                });
            }
        })
    })
};


//a partir de los países filtrados, se obtiene un array con los nombres de los países. Tal array será ocupado en la propiedad 'labels' del gráfico
const getCountry = async () => {
    var local = [];
    const data = await filterCountries();
    data.map((element) => {
        local.push(element.location);
    });
    return local;
};

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
};

//se agrega puntos en los números
const numberWithDots = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//se consume la API para el gráfico por país
const getDataModal = async (countryName) => { 

    //verificar problema en la API para países com espaço como: South Africa:     
    let response=null;
    if(countryName.includes(" ")){
        let countryModified=countryName.replace(' ', '_');
        response = await fetch(`https://covid2019-api.herokuapp.com/country/${countryModified}`);
        const data = await response.json();
        return {data,countryModified};
    }else{
        response = await fetch(`http://localhost:3000/api/countries/${countryName}`);
        const { data } = await response.json();    
        return data;
    }
};

//esta variable deja el espacio para el gráfico vacío antes de llamar la función chartCountry
let chartPais = null;

//se crea una función que recibe los datos de cada país y en seguida se crea el gráfico
const chartCountry = async (data) => {  
    /* let countryName=null;
    if(data.length>3){
        countryName=  await data.location;
        console.log(countryName);
    } */
    let objLength= Object.keys(data);
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

//se aplica una IIFE para ejecutar la aplicación inmediatamente
const init = (async () => {
    const country = await filterCountries();
    const local = await getCountry();
    const dataTable = await filterCountriesTable();
    chartGlobal(local, country);
    fillTable(dataTable);
})();
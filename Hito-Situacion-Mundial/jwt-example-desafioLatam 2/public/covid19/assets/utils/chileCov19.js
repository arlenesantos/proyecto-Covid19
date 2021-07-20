import {chartChile} from './graficos.js'

const btnSituacionChile = document.querySelector('#chile a');


btnSituacionChile.addEventListener('click',async ()=>{
    document.getElementById("loader").classList.remove("d-none");
    document.getElementById("mainTable").classList.add("d-none");
    let token=null;
    (()=>{
        token = localStorage.getItem('jwt-token');
    })();
    await getDataChile(token);
    document.getElementById("loader").classList.add("d-none");
    await chartChile(dataChile,fechas);
})


let dataChile=[];
let arrConfirmados=[];
let arrMuertos=[];
let arrRecuperados=[];
let fechas=[];

//Esta funcion se encarga se traer la data_01 una vez obtenido el token anteriormente
const getConfirmed = async (jwt) => {
    try {
    const responseConfirmed = await fetch( `http://localhost:3000/api/confirmed`,
    {
    method: 'GET',
    headers: {
    Authorization: `Bearer ${jwt} `
    }
    })
    const { data } = await responseConfirmed.json();
    return data;
    } catch (err) {
    console.error( `Error: ${err} `);
    }
};

//Esta funcion se encarga se traer la data_02 una vez obtenido el token anteriormente
const getDeaths = async (jwt) => {
    try {
    const responseDeaths = await fetch( `http://localhost:3000/api/deaths`,
    {
    method: 'GET',
    headers: {
    Authorization: `Bearer ${jwt} `
    }
    })
    const { data } = await responseDeaths.json();
    return data;
    } catch (err) {
    console.error( `Error: ${err} `);
    }
};

//Esta funcion se encarga se traer la data_03 una vez obtenido el token anteriormente
const getRecovered = async (jwt) => {
    try {
    const responseRecovered = await fetch( `http://localhost:3000/api/recovered`,
    {
    method: 'GET',
    headers: {
    Authorization: `Bearer ${jwt} `
    }
    })
    const { data } = await responseRecovered.json();
    return data;
    } catch (err) {
    console.error( `Error: ${err} `);
    }
};

//Se unifica la información obtenida anteriormente
export const getDataChile = async (jwt)=>{
    if(dataChile.length==3){
    }else{
        const confirmados = await getConfirmed(jwt);
        const muertos = await getDeaths(jwt);
        const recuperados = await getRecovered(jwt);
        confirmados.forEach((e)=>{
            fechas.push(e.date)
        })
        confirmados.forEach((e)=>{
            arrConfirmados.push(e.total)
        })
        muertos.forEach((e)=>{
            arrMuertos.push(e.total)
        })
        recuperados.forEach((e)=>{
            arrRecuperados.push(e.total)
        })
        dataChile.push(arrConfirmados);
        dataChile.push(arrMuertos);
        dataChile.push(arrRecuperados);    
    };
};
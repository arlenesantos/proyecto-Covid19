import { chartCountry } from "./graficos.js"
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

//se consume la API para el gráfico por país
const getDataModal = async (country) => { 
    const msg = document.getElementById("msg-error");
    try {
        msg.innerHTML = '';
        const response = await fetch(`http://localhost:3000/api/countries/${country}`);
        const { data } = await response.json(); 
        if(data.active == null || data.active == undefined || Object.keys(data).length === 0) {
            msg.innerHTML = 'La información de la API a la que deseas acceder tiene un problema para mostrar los datos de este país';
            console.log('el país que deseas ver posee problemas para mostrar su modal')
        }
        chartCountry(data);
    } catch (err) {
    msg.innerHTML = "Nuestras disculpas, los datos tienen errores, intente solicitarlos una vez más.";
    }
};

export { getData, filterCountries, getCountry, getDataModal }
  
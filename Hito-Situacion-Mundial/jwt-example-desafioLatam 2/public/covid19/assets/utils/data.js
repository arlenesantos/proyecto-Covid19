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

//se consume la API para el gráfico por país
const getDataModal = async (country) => { 
    //verificar problema en la API para países com espaço como: South Africa, una posible solución seria:     
    //country.replace(' ', '%20');  
    const response = await fetch(`http://localhost:3000/api/countries/${country}`);
    const { data } = await response.json();    
    chartCountry(data);
};

export { getData, filterCountries, getCountry, getDataModal }
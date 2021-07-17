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
    try {
    const response = await fetch(`http://localhost:3000/api/countries/${country}`);
    const { data } = await response.json(); 
    chartCountry(data);
    if(data.active == null || data.active == undefined){
        alert('La información de la API a la que deseas acceder tiene un problema para mostrar los datos de este país');
    console.log('el país que deseas ver posee problemas para mostrar su modal')
}
} catch (err) {
    alert( "Nuestras disculpas, los datos tienen errores, intente solicitarlos una vez más." );
    }};


/*// TODO: ARREGLAR CUANDO LLEGA VACÍO EL .JSON
//se consume la API para el gráfico por país
const getDataModal = async (country) => { 
    try {
    //verificar problema en la API para países com espaço como: South Africa, una posible solución seria:     
    //country.replace(' ', '%20'); 
    const response = await fetch(`http://localhost:3000/api/countries/${country}`);
    const { data } = await response.json();    
    chartCountry(data);
    if(country == " " || country == null || country == undefined){
        continue getDataModal;
        throw new Error("No hay datos para este país");
}   else{
    continue getDataModal;
    return getDataModal;
}  } catch (err) {
  alert( "Nuestras disculpas, los datos tienen errores, intentaremos solicitarlos una vez más." );
    alert( err.name );
    alert( err.message );
  }

};
 */

export { getData, filterCountries, getCountry, getDataModal }
  
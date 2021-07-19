//se consume la API
export const getData = async () => {
    const response = await fetch("http://localhost:3000/api/total");
    const info = await response.json();
    const data = info.data;        
    return data;
};

//se filtra los países con más de 10.000 casos 
export const filterCountries = async () => {
    const data = await getData();
    const country = data.filter((cases) => {
        return cases.active > 10000;       
    }); 
    return country;
};

//Request para logica de tabla
export const filterCountriesTable = async () => {
    const data = await getData();
    const countryTable = data.filter((cases) => {
        return cases.active > 10000; // Se filtra para llenar info en la tabla      
    });
    return countryTable;
};


//se consume la API para el gráfico por país
export const getDataModal = async (countryName) => { 
    const msg = document.getElementById("msg-error");
    if(msg!=null){
        msg.innerHTML = '';
    }
    //verificar problema en la API para países com espaço como: South Africa:     
    let response=null;
    try {
        if(countryName.includes(" ")){
            msg.innerHTML = 'La información de la API a la que deseas acceder tiene un problema para mostrar los datos de casos activos en este país';
            let countryModified=countryName.replace(' ', '_');
            response = await fetch(`https://covid2019-api.herokuapp.com/country/${countryModified}`);
            const data = await response.json();
            return {data,countryModified};
        }else{
            response = await fetch(`http://localhost:3000/api/countries/${countryName}`);
            const { data } = await response.json();    
            return data;
        };
    } catch (error) {
        console.log(error);
    }
};

//a partir de los países filtrados, se obtiene un array con los nombres de los países. Tal array será ocupado en la propiedad 'labels' del gráfico
export const getCountry = async () => {
    var local = [];
    const data = await filterCountries();
    data.map((element) => {
        local.push(element.location);
    });
    return local;
};

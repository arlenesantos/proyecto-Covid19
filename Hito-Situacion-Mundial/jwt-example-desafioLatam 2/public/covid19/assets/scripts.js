import { chartGlobal } from "./utils/graficos.js"
import { getData, filterCountries, getCountry, getDataModal } from "./utils/data.js"
import { showTable  } from "./utils/render.js"
import login from "./utils/login.js"
import * as Chile from "./utils/chileCov19.js"



//se agrega un evento listener en cada link/botón para acceder al modal
const activeBtn = (country) => {
    country.forEach(element => {        
        document.getElementById(`${element.location}`).addEventListener("click", () => {
            document.querySelector("#modalPais").innerHTML = "";
            document.querySelector("#modalPais").innerHTML = element.location;
            getDataModal(element.location);                        
        }); 
    });
};

//se agrega funcionalidad al link Home del menú
const btnHome = document.querySelector('#home a');

btnHome.addEventListener('click',async ()=>{
    document.getElementById("loader").classList.remove("d-none");
    document.getElementById("mainTable").classList.remove("d-none");
    //Se busca corroborar que exista la información previo a re-poblar el gráfico
    if(local!=null&&country!=null){
        chartGlobal(local, country);
    }else{
        country = await filterCountries();
        local = await getCountry();
        chartGlobal(local, country);
    }
    document.getElementById("loader").classList.add("d-none");
});
//se inician los array contenedores de la data
let local = null;
let country=null;
//se aplica una IIFE para ejecutar la aplicación inmediatamente
const init = (async () => {
    const total = await getData();
    country = await filterCountries();
    local = await getCountry();

    document.getElementById("loader").classList.add("d-none");
    document.getElementById("mainTable").classList.remove("d-none");
    
    chartGlobal(local, country);
    showTable(total);
    activeBtn(total);        
    
})();

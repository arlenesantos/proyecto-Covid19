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
    const country = await filterCountries();
    const local = await getCountry();
    document.getElementById("loader").classList.add("d-none");
    chartGlobal(local, country);
});


//se aplica una IIFE para ejecutar la aplicación inmediatamente
const init = (async () => {
    const total = await getData();
    const country = await filterCountries();
    const local = await getCountry();

    document.getElementById("loader").classList.add("d-none");
    document.getElementById("mainTable").classList.remove("d-none");
    
    chartGlobal(local, country);
    showTable(total);
    activeBtn(total);        
    
})();

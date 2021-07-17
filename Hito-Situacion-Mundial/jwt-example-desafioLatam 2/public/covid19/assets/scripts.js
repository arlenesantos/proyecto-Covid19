import { chartGlobal } from "./utils/graficos.js"
import { getData, filterCountries, getCountry, getDataModal } from "./utils/data.js"
import { showTable  } from "./utils/render.js"

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

import {filterCountries,filterCountriesTable,getCountry} from './js/datas.js'
import {chartGlobal} from './js/globalChart.js'
import * as tableLogic from './js/tableCountries.js'

//se aplica una IIFE para ejecutar la aplicación inmediatamente
const init = (async () => {
    const country = await filterCountries();
    const local = await getCountry();
    const dataTable = await filterCountriesTable();

    document.getElementById("loader").classList.add("d-none");
    document.getElementById("mainTable").classList.remove("d-none");

    chartGlobal(local, country);
    tableLogic.fillTable(dataTable);
})();
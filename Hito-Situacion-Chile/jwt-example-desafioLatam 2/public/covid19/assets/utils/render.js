//se agrega puntos en los números
const numberWithDots = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//se despliega toda la información de la API en una tabla
const showTable = (country) =>{    
    country.forEach((element) => {
    document.getElementById("dataTable").innerHTML +=   
        `<tr>
         <th scope="row">${element.location}</th>
         <td>${numberWithDots(element.active)}</td>
         <td>${numberWithDots(element.confirmed)}</td>
         <td>${numberWithDots(element.deaths)}</td>
         <td>${numberWithDots(element.recovered)}</td>
         <td data-toggle="modal" data-target="#modal"><button id="${element.location}" type="button" class="btn btn-outline-secondary">Ver detalle</button></td>         
         </tr>`
    }); 
};

export { showTable }
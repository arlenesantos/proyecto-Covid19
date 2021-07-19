import {filterCountriesTable,getDataModal} from './datas.js'
import {chartCountry} from './countryChart.js';

//Array contenedor de info para pintar en la tabla
var countryTable=[];
var countryMax=null;
( async ()=>{
    countryTable = await filterCountriesTable();
    countryMax=countryTable.length;
    console.log(countryTable);
})();

//DOM a tabla y botones de tablas
const tabla=document.querySelector('#dataTable');
const btnPreview=document.querySelector('#btn_preview');
const btnNext=document.querySelector('#btn_next');
const currentPage=document.querySelector('#current_page')
const $modal=$('#modal');
var modalTitle=document.querySelector('.modal-title')
var btnsModal=document.querySelectorAll('button .btn-modal');

//Variables principales utilizadas al momento de pintar paginación de la tabla
var initData=0;
var range=9;
var page=1;

//Modifica variables de control de paginación
btnPreview.addEventListener('click',()=>{
    if(initData<10||range<10){
        initData=0;
        range=9;
        page=1;
        btnPreview.disabled=true;
    }else{
        initData-=10;
        range-=10;
        page-=1;
    };

    //Lógica de activación de botón Preview
    if(page<Math.floor((countryMax/10)+1))btnNext.disabled=false;

    tabla.innerHTML="";
    currentPage.innerText=`Página : 0${page}`;
    fillTable(countryTable);
});
btnNext.addEventListener('click',()=>{
    if(range>countryMax-10){
        initData=countryMax - 10;
        range=countryMax-1;
        page=Math.floor((countryMax/10)+1);
        btnNext.disabled=true;
    }else{
        initData+=10;
        range+=10;
        page+=1;
    };

    //Lógica de activación de botón Next
    if(page>1)btnPreview.disabled=false;
    
    tabla.innerHTML="";
    currentPage.innerText=`Página : 0${page}`;
    fillTable(countryTable);
});

//se despliega toda la información de la API en una tabla con paginación incluida
export const fillTable=async (data)=>{
    for(let i=initData;i<range;i++){
        let tr=document.createElement('tr')
        tr.innerHTML=`
        <th scope="row">${data[i].location}</th>
        <td>${numberWithDots(data[i].active)}</td>
        <td>${numberWithDots(data[i].confirmed)}</td>
        <td>${numberWithDots(data[i].deaths)}</td>
        <td>${numberWithDots(data[i].recovered)}</td>
        <td><button class="button btn-modal btn-success" id="${data[i].location}">Ver detalle</button></td>
        `
        tabla.appendChild(tr)
    };
    btnsModal=document.querySelectorAll('.btn-modal');
    btnsModal.forEach((element)=>{
        element.addEventListener('click',async (e)=>{
            let local_url=e.target.id;
            let dataLocal=await getDataModal(local_url);
            if(dataLocal.hasOwnProperty('data')){
                let dataPath=dataLocal.countryModified;
                modalTitle.innerText= dataPath; //Se cambia el nombre del modal por país
                chartCountry(dataLocal.data[dataPath]);
                $modal.modal('toggle',()=>{
                });
            }else{
                modalTitle.innerText=await dataLocal.location; //Se cambia el nombre del modal por país
                chartCountry(dataLocal);
                $modal.modal('toggle',()=>{
                });
            }
        })
    })
};

//se agrega puntos en los números
const numberWithDots = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
# PROYECTO COVID-19

* **Arlene Santos**
* **Eduardo Araya**
* **Isaac Piedra** 
* **Mario Flores**

# Hito 1 - Situación Mundial

## Versiones

**V1.0**
* *Se crea una estructura básica con HTML para el proyecto y se cargan las librerías de Bootstrap, jQuery y Chart.js.*
* *La estructura inicial adoptada contiene navbar, gráfico, tabla y modal.* 
* *Se realizan pruebas iniciales en el código.*

**V2.0**
* *Trabajamos con Git y se sube la estructura básica como siendo la branch main del proyecto.*
* *Se ocupa la estrategia de trabajar con branches y pull request a la branch main.*
* *Se aplican los requerimientos y se verifica que el código funciona correctamente.*

**V3.0**
* *Se aplican mejoras en el proyecto como cambio de estilo y de colores de los gráficos.*
* *Se agrega una estructura de control para manejar el error de los países con espacio (la API no entrega dados de países com espacios en sus nombres).*
* *Se estructura el código del proyecto en módulos.*

**V4.0**
* *Se verifican los pull request pendientes y se agrega a la branch main los cambios aprobados por el equipo.*
* *Se verifica y valida que el código funciona correctamente.*

# Hito 2 - Situación Chile

## Versiones

**V1.0**
* *Se implementa la funcionalidad de login en la opción Iniciar sesión.*
* *Se obtiene un JWT y se almacena el token en el navegador con localStorage.*
* *Se valida la existencia del token y en caso positivo se oculta la opción del menú Iniciar y se agregan las opciones Situación Chile y Cerrar sesión. En caso negativo, se agrega un alerta para el usuario.* 
* *Se realizan pruebas iniciales en el código.*

**V2.0**
* *Se crea una sesión que muestre el avance diario de la pandemia en Chile por medio de un gráfico de línea, consumiendo las respectivas APIs.*
* *Se ocultan el gráfico de todos los países y también la tabla.*
* *Se verifica y valida que el código funciona correctamente.*

**V3.0**
* *Se agrega la funcionalidad de logout al hacer click sobre el link Cerrar sesión del menú.*
* *Se agrega funcionalidad al link Home del menú. Se vuelve al estado inicial de la aplicación, pero aún se permite navegar por las opciones Situación Chile y Cerrar sesión.*
* *Se verifica y valida que el código funciona correctamente.*

**V4.0**
* *Se verifican los pull request pendientes y se hacen las mejoras identificadas por el revisor (miembro del equipo designado para ese rol).*
* *Se agrega a la branch main los cambios aprobados por el equipo.*
* *Se verifica y valida que el código funciona correctamente.*

**Notas acerca de la API**
* *Al filtrar países con más de 10.000 casos activos y desplegarlos en el gráfico principal de la aplicación, se observó que los datos de cada país son contemplados en el gráfico, pero no se muestra los nombres de todos los países en los respectivos labels (eje x)*
* *Revisamos la documentación de Chart.js y el máximo en scales del label "x" es de 40, manejando los demás labels por default sin desplegarlos en el gráfico.*




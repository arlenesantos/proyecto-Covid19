# PROYECTO COVID-19

# Hito 1 - Situación Mundial

* **Arlene Santos**
* **Eduardo Araya**
* **Isaac Piedra** 
* **Mario Flores**

# Versiones

**V1.0**
* *Se crea una estructura básica con HTML para el proyecto y se cargan las librerías de Bootstrap, jQuery y Chart.js.*
* *La estructura inicial adoptada contiene navbar, gráfico, tabla y modal.* 
* *Se realizan pruebas iniciales en el código.*

**V2.0**
* *Trabajamos con Git y se sube la estructura básica como siendo la branch main del proyecto.*
* *Se ocupa la estrategia de trabajar con branches y pull request a la branch main.*
* *Se aplican los requerimientos y se verifica que el código funciona correctamente.*

**V3.0**
* *Se aplican mejoras en el proyecto como cambio de estilo y de colores de los gráficos*
* *Se implementa paginación en la tabla.*
* *Se agrega una estructura de control para manejar el error de los países con espacio (la API no entrega dados de países com espacios en sus nombres).*
* *Para los países con espacio en sus nombres, se consume los datos directamente de herokuapp*
* *Se estructura el código del proyecto en módulos.*

**V4.0**
* *Se verifican los pull request pendientes y se agrega a la branch main los cambios aprobados por el equipo.*
* *Se verifica y valida que el código funciona correctamente*

**Notas acerca de la API**
* *Al filtrar países con más de 10.000 casos activos y desplegarlos en el gráfico principal de la aplicación, se observó que los datos de cada país son contemplados en el gráfico, pero no se muestra los nombres de todos los países en los respectivos labels (eje x)*
* *Revisamos la documentación de Chart.js y el máximo en scales del label "x" es de 40, manejando los demás labels por default sin desplegarlos en el gráfico.*





PRUEBA TÉCNICA PARA EL FRONTEND DE GRABILITY
SPA CHALLENGE
Pagina en vivo:
http://johanjaguar.github.io/test/marvel
Repositorio:
https://github.com/johanjaguar/test/tree/master/marvel
 
 

    Distribución de la SPA

    El proyecto esta organizado manejando el MVW que se propone desde AngularJs, separando en diferentes carpetas el html(partials), javascript(build/js), css(build/css), y las imágenes que se usaron (build/images-op).
    Cada una de las sub-carpetas del directorio build tiene sus archivos fuente en javascript, images y scss respectivamente, las cuales mediante una tarea en gulp.js, se optimiza, compila y queda en los archivos que llama la pagina web.

    Los archivos de angular se ubican en la carpeta src/javascript/angular, usando algunos archivos js de apoyo, y distribuyendo la parte de angular, en controladores y modelo.

    Para consultar desde la aplicación a la API de marvel, se construyeron dos servicios que consultaban en la API y devuelven los resultados a los controladores, los cuales procesaban estos datos para que se reflejaran en la vista.

    A continuación daré un breve resumen de todas las tareas utilizadas para el desarrollo del proyecto

    Gestor de tareas - gulp
    Compilador de css - SASS
    Framework JS - AngularJs

    Se crearon 4 controladores para la aplicación, el controlador principal el cual contiene métodos para cambiar los datos que muestra la aplicación e interactuar con los diferentes controladores, en este controlador también se hace revisión del arreglo de favoritos, el cual esta vigilando constantemente sus cambios para hacerlos en la persistencia de la aplicación.

    Se crearon 3 controladores adicionales, uno para la búsqueda de los personajes, otro para el manejo de favoritos, y uno mas para la paginación de la pagina.

    Se crearon 2 servicios factory, uno para la búsqueda de personajes y otro para la búsqueda segun el comic, la cual se realiza al hacer clic en los comic relacionados de cada personaje.

    Se manejo el versionamiento con git, de manera sencilla, se tenían 2 ramas, la rama gh-pages la cual cree para poder ver la pagina web a través de github pages, y tome esta rama como rama de desarrollo, y la rama principal master la cual se le hacia merge cada vez que tenia una version estable en gh-pages.

    Así mismo cada vez que tenia un desarrollo adicional para hacer, se creaba una rama local que no se subiría al repositorio, al finalizarla y probarla se hacia merge de cada rama en gh-pages de manera local, y esta se subia a git.

     

    CODE REFACTORING
    Código original: https://github.com/johanjaguar/test/blob/master/marvel/src/javascript/refactoring.js

    Propuesta de refactoring.
    https://github.com/johanjaguar/test/blob/master/marvel/src/javascript/refactoring-final.js

    1. A continuación enumero las practicas malas que se encontraron en el código:
    Comentarios innecesarios

    Sentencias if anidadas y difíciles de leer

    Muchas funciones para el mismo método.

    Lo primero que se hizo para reescribir el código fue eliminar los comentarios que tenia, reduciendo el numero de caracteres.
    Enseguida, se busco la forma de quitarle la complejidad de las anidaciones de if, para lo cual se propuso revisar cuales serian las diferentes condicionales que podrian existir en la aplicacion y se guardaron en 4 variables booleanas.

    En seguida se hicieron 4 nuevos if llamando las 4 variables hechas anteriormente, mejorando la legibilidad de este código.

    Por ultimo, se noto que para el caso que se devolvía 0 como error, había un código muy grande dentro del if, se encapsulo este código en una nueva función y se llama desde la función post_confim.

     
    PREGUNTAS 

    1. Consiste en que cada clase y método se debe encargar de una sola tarea, y esta tarea debería estar resuelta entera dentro de esta clase/método.

    También nos sugiere que todas las responsabilidades deberían estar separadas.
     
    2. Que sea un código fácil de leer, en la medida de lo posible modular, con clases que se encargan de una única función, con los estilos, vistas, y controladores separados, con archivos pequeños separados por funciones para evitar el código espagueti. 


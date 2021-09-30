Para Correr el Server:
- Descargar node
- Hacer un npm install en el proyecto.
- Levantar el server con npm run start; ( corre en el puerto 8080)

Para jugar se pueden hacer api calls desde el postman.

Crear un tablero nuevo con - POST : http://localhost:8080/boards 
* Por defecto lo crea de 10 * 10. Se puede indicar dimensiones a través del body ( Por ejemplo {"width" : 100 , "height" : 100});
* El post te devuelve el tablero creado con su id.


Para hacer click sobre un casillero - POST : http://localhost:8080/boards/:id_tablero/squares/:id_casillero
* Por defecto se revela el contenido del casillero. Se puede indicar que se quiere poner una bandera a traves del body ( { "option" : "flag"});
* Se debe pasar el id_tablero creado y el id_casillero ( string con la posicion del casillero fila-columna. Por ejemplo 00 seria el primero casilero );


- POST : http://localhost:8080/boards/:id_tablero/graph
* Esta url te devuelve un string con el tablero de una forma mas visual.
    - La U es un casillero sin clickear
    - La ? es una bandera
    - La X es una mina


- GET : http://localhost:8080/boards/id_casillero
* Este metodo te devuelve el tablero con todos sus elementos.
* En caso de no encontrar un casillero con el id_casillero creo uno nuevo con el siguiente id disponible
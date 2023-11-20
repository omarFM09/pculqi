# pculqi
prueba técnica de culqi

Para poder ejecutar los comandos y pruebas de apis ejecutar lo siguiente

Primero : levantar redis
    redis-server
    redis-cli

segundo: levantar consola y ejecutar
    npm run exec

    Esto va a levantar los servicios en los cuales tenemos las siguientes apis

    Probar en postman
    http://localhost:3004
        Esta ruta solo muestra un msg que dice "API FUNCIONANDO" confirmando que el servicio se levantó de manera correcta.

    http://localhost:3004/api/savetarjeta
        Esta ruta espera un body 
            {
                "email" : "omarfajardomora11@gmail.com" ,
                "card_number" : "4111111111111111", 
                "cvv" : "123", 
                "expiration_year" : "2028",
                "expiration_month" : "01" 
            }
        la cual contiene ciertas validaciones para los 5 campos que se envían. Al ser enviado retorna un token, el cual se tiene que copiar poder usarlo en el tercer servicio.
        En caso no cumpla con alguna validación, se retornará un mensaje mencionandolo.

        Tener en cuenta que el token estará vigente por 1 minuto.

    http://localhost:3004/api/tarjeta
        En esta ruta nos dirigimos a 'Authorization', en type seleccionamos 'Bearer Token' y a la derecha se habilita un input llamado token para poder pegar el token previamente generado (2do servicio).
        Esto nos muestra la información registrada en el 2do servicio, exceptuando el campo 'cvv'.

tercero: para realizar las pruebas unitarias, en consola ejecutar
    npm run test

    en el que los describe se encuentran en 'tests/myutility.test.ts'


Para poder ver la información registrada, ver en el server-cli ejecutando 'KEYS *'
y muestra el valor 'tarjeta', lo siguiente será ejecutar el siguiente comando. 'GET tarjeta' el cual muestra el valor en formato json.

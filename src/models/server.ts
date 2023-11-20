import express, { Application } from 'express';
import connection from '../db/connection';
import routesDefault from '../routes/default.routes';
import routesTarjeta from '../routes/tarjeta.routes';
import routesSaveTarjeta from '../routes/savetarjeta.routes';
import { TokenValidation } from '../libs/verifyToken';
import { createClient } from 'redis';



class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3005';
        this.listen();
        this.conectDB();
        this.midlewares()
        this.routes();
        this.redis();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        })
    }

    conectDB() {
        connection.connect((err) => {
            if(err) {
                console.log(err)
            } else {
                console.log('Base de datos conectada exitosamente!');
            }
        })
    }

    routes() {
        this.app.use('/', routesDefault);
        this.app.use('/api/tarjeta', TokenValidation, routesTarjeta );
        //this.app.use('/api/tarjeta', routesTarjeta );
        this.app.use('/api/savetarjeta', routesSaveTarjeta );
    }

    midlewares() {
        this.app.use(express.json());
    }

    redis(){
        const client = createClient({
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT || '6379', 10)
            }
        });
    }
}

export default Server;


import express, { Application } from 'express';
import connection from '../db/connection';
import routesDefault from '../routes/default.routes';
import routesTarjeta from '../routes/tarjeta.routes';
import routesSaveTarjeta from '../routes/savetarjeta.routes';
import { TokenValidation } from '../libs/verifyToken';

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
        //this.app.use('/api/tarjeta', TokenValidation, routesTarjeta );
        this.app.use('/api/tarjeta', routesTarjeta );
        this.app.use('/api/savetarjeta', routesSaveTarjeta );
    }

    midlewares() {
        this.app.use(express.json());
    }

}

export default Server;

import express, {Application} from 'express';
import morgan from 'morgan'
import cors from 'cors';
import apiRoutes from './src/rutas/apiRoutes'

class server{
    public app: Application;
    constructor(){
        this.app= express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT||3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes(): void{
        this.app.use('/Practica1',apiRoutes);
    }
    start(): void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('servidor se encuentra en: ',this.app.get('port'));
        })
    }
}

export const servidor= new server();
servidor.start();
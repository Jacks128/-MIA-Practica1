import {Request, Response} from 'express';
import pool from '../../database';

class ApiController{
    public async getConsulta1(req: Request,res: Response){ 
    const peticion = await pool.query(`
     SELECT HOSPITAL.NOMBRE, HOSPITAL.DIRECCION, count(REGISTRO_VICTIMA.FECHAMUERTE) AS CANTIDAD_MUERTES
    FROM HOSPITAL
    INNER JOIN REGISTRO_VICTIMA
    ON REGISTRO_VICTIMA.ID_HOSPITAL=HOSPITAL.ID_HOSPITAL
    WHERE REGISTRO_VICTIMA.FECHAMUERTE!=0
    group by HOSPITAL.NOMBRE, HOSPITAL.DIRECCION;`);
    res.json(peticion);
    }

    public async getConsulta2(req: Request,res: Response){ 
    const peticion = await pool.query(`
    SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO
	FROM VICTIMA 
    INNER JOIN REGISTRO_VICTIMA
    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA
	INNER JOIN CONTROLTRATAMIENTO
    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA
    WHERE REGISTRO_VICTIMA.ID_STATUS=2 AND CONTROLTRATAMIENTO.ID_TRATAMIENTO=2 AND  CONTROLTRATAMIENTO.EFECTIVIDADVICTIMA>5
    ORDER BY VICTIMA.NOMBRE ASC;`);
    res.json(peticion);
    }   

    public async getConsulta3(req: Request,res: Response){ 
    const peticion = await pool.query(` 
    SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA.DIRECCION, COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO) AS NUMEROASOC
    FROM VICTIMA
    INNER JOIN REGISTRO_VICTIMA
    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA
    INNER JOIN VICTIMA_ASOCIADO
    ON VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA
    WHERE REGISTRO_VICTIMA.FECHAMUERTE IS NOT NULL
    group by VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA.DIRECCION
    having NUMEROASOC>3;`);
    res.json(peticion);
    } 
    
    public async getConsulta4(req: Request,res: Response){ 
    const peticion = await pool.query(`
    SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO, COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO) AS NUMEROASOC, VICTIMA_ASOCIADO.ID_TIPOCONTACTO
    FROM VICTIMA
    INNER JOIN REGISTRO_VICTIMA
    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA
    INNER JOIN VICTIMA_ASOCIADO
    ON VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA
    WHERE REGISTRO_VICTIMA.ID_STATUS=5 AND VICTIMA_ASOCIADO.ID_TIPOCONTACTO=6
    GROUP BY VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA_ASOCIADO.ID_TIPOCONTACTO
    HAVING NUMEROASOC>=2;
    `);
    res.json(peticion);
    } 

    public async getConsulta5(req: Request,res: Response){ 
    const peticion = await pool.query(` 
    SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO
    FROM VICTIMA
    INNER JOIN CONTROLTRATAMIENTO
    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA
    WHERE CONTROLTRATAMIENTO.ID_TRATAMIENTO=3
    GROUP BY VICTIMA.NOMBRE,VICTIMA.APELLIDO,VICTIMA.ID_VICTIMA
    ORDER BY  COUNT(CONTROLTRATAMIENTO.ID_TRATAMIENTO) LIMIT 5;`);
    res.json(peticion);
    }     
    
    public async getConsulta6(req: Request,res: Response){ 
    const peticion = await pool.query(` 
    SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO, REGISTRO_VICTIMA.FECHAMUERTE
    FROM VICTIMA
    INNER JOIN REGISTRO_VICTIMA
    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA
    INNER JOIN CONTROLTRATAMIENTO
    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA
    INNER JOIN CONTROL_LUGAR
    ON CONTROL_LUGAR.ID_VICTIMA=VICTIMA.ID_VICTIMA
    INNER JOIN LUGAR 
    ON LUGAR.ID_LUGAR=CONTROL_LUGAR.ID_LUGAR
    WHERE LUGAR.UBICACION="1987 Delphine Well" AND CONTROLTRATAMIENTO.ID_TRATAMIENTO=1;`);
    res.json(peticion);
    } 

    public async getConsulta7(req: Request,res: Response){ 
    const peticion = await pool.query(`
    SELECT DISTINCT VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA.DIRECCION, COUNT(CONTROLTRATAMIENTO.ID_TRATAMIENTO)=2 AS TRATAMIENTO, COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO) AS ASOCIADOS
    FROM VICTIMA
    INNER JOIN VICTIMA_ASOCIADO
    ON VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA
    INNER JOIN CONTROLTRATAMIENTO
    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA
    INNER JOIN REGISTRO_VICTIMA
    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA
    INNER JOIN HOSPITAL
    ON REGISTRO_VICTIMA.ID_HOSPITAL=HOSPITAL.ID_HOSPITAL
    WHERE (SELECT DISTINCT COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO) FROM VICTIMA_ASOCIADO WHERE VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA)<2
    GROUP BY VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA.DIRECCION
    HAVING  COUNT(CONTROLTRATAMIENTO.ID_TRATAMIENTO)=2 ;`);
    res.json(peticion);
    }     
    
    public async getConsulta8(req: Request,res: Response){ 
    const peticion = await pool.query(`
    (SELECT month(REGISTRO_VICTIMA.FECHASOSPECHOSA) AS MES, VICTIMA.NOMBRE, VICTIMA.APELLIDO, COUNT(CONTROLTRATAMIENTO.ID_TRATAMIENTO) AS TRATA
    FROM VICTIMA
    INNER JOIN CONTROLTRATAMIENTO
    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA
    INNER JOIN REGISTRO_VICTIMA
    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA
    GROUP BY VICTIMA.NOMBRE, MES, VICTIMA.APELLIDO
     ORDER BY TRATA DESC LIMIT 10)
    UNION 
    (SELECT month(REGISTRO_VICTIMA.FECHASOSPECHOSA) AS MES, VICTIMA.NOMBRE, VICTIMA.APELLIDO, COUNT(CONTROLTRATAMIENTO.ID_TRATAMIENTO) AS TRATA
    FROM VICTIMA
    INNER JOIN CONTROLTRATAMIENTO
    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA
    INNER JOIN REGISTRO_VICTIMA
    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA
    GROUP BY VICTIMA.NOMBRE, MES, VICTIMA.APELLIDO
     ORDER BY TRATA ASC LIMIT 10);`);
    res.json(peticion);
    } 
    
    public async getConsulta9(req: Request,res: Response){ 
    const peticion = await pool.query(`
    SELECT HOSPITAL.NOMBRE,((SELECT COUNT(HOSPITAL.ID_HOSPITAL))*100/(SELECT count(REGISTRO_VICTIMA.ID_VICTIMA) FROM REGISTRO_VICTIMA)) AS NUMERADOR
    FROM HOSPITAL
    INNER JOIN REGISTRO_VICTIMA
    ON REGISTRO_VICTIMA.ID_HOSPITAL=HOSPITAL.ID_HOSPITAL
    group by HOSPITAL.NOMBRE;
    `);
    res.json(peticion);
    }     

    public async getConsulta10(req: Request,res: Response){ 
    const peticion = await pool.query(` 
    SELECT HOSPITAL.NOMBRE, TIPOCONTACTO.CONTACTO, 
    (
    ((COUNT(TIPOCONTACTO.ID_TIPOCONTACTO))*100)/(SELECT COUNT(VICTIMA_ASOCIADO.ID_TIPOCONTACTO) FROM VICTIMA_ASOCIADO)
    ) AS PORCENTAJE
	FROM VICTIMA_ASOCIADO
	INNER JOIN TIPOCONTACTO
	ON VICTIMA_ASOCIADO.ID_TIPOCONTACTO=TIPOCONTACTO.ID_TIPOCONTACTO
	INNER JOIN VICTIMA
	ON VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA
	INNER JOIN REGISTRO_VICTIMA
	ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA
	INNER JOIN HOSPITAL
	ON REGISTRO_VICTIMA.ID_HOSPITAL=HOSPITAL.ID_HOSPITAL
	GROUP BY HOSPITAL.NOMBRE, TIPOCONTACTO.CONTACTO
    ORDER BY HOSPITAL.ID_HOSPITAL;`);
    res.json(peticion);
    }       

    public async geteliminarTemporal(req: Request,res: Response){ 
        const peticion = await pool.query(` 
        DROP TABLE TABLATEMPORAL;
        `);
        res.json(peticion);
        }    
        
    public async geteliminarModelo(req: Request,res: Response){ 
        const peticion = await pool.query(` 
        DROP TABLE CONTROLTRATAMIENTO;
     
        `);
        const peticion1 = await pool.query(` 
        DROP TABLE REGISTRO_VICTIMA;
     
        `);

        const peticion2 = await pool.query(` 
        DROP TABLE VICTIMA_ASOCIADO;
     
        `);

        const peticion3 = await pool.query(` 
        DROP TABLE CONTROL_LUGAR;
     
        `);

        const peticion4 = await pool.query(` 
        DROP TABLE TIPOCONTACTO;
     
        `);

        const peticion5 = await pool.query(` 
        DROP TABLE STATUSENFERMEDAD;
     
        `);

        const peticion6 = await pool.query(` 
        DROP TABLE VICTIMA;
     
        `);

        const peticion7 = await pool.query(` 
        DROP TABLE HOSPITAL;
     
        `);

        const peticion8 = await pool.query(` 
        DROP TABLE TRATAMIENTO;
     
        `);

        const peticion9 = await pool.query(` 
        DROP TABLE ASOCIADO;
     
        `);

        const peticion10 = await pool.query(` 
        DROP TABLE LUGAR;
     
        `);

        res.json(peticion);
        res.json(peticion1);
        res.json(peticion2);
        res.json(peticion3);
        res.json(peticion4);
        res.json(peticion5);
        res.json(peticion6);
        res.json(peticion7);
        res.json(peticion8);
        res.json(peticion9);
        res.json(peticion10);

    }      
    
    public async getcargarTemporal(req: Request,res: Response){ 
        const peticion = await pool.query(` 
        CREATE TABLE IF NOT EXISTS TABLATEMPORAL
        (
        NOMBRE_VICTIMA varchar(50),
        APELLIDO_VICTIMA varchar(50),
        DIRECCION_VICITMA varchar(80),
        FECHA_PRIMERA_SOSPECHA datetime,
        FECHA_CONFIRMACION datetime,
        FECHA_MUERTE datetime,
        ESTADO_VICTIMA varchar(30),
        NOMBRE_ASOCIADO varchar(50),
        APELLIDO_ASOCIADO varchar(50),
        FECHA_CONOCIO datetime,
        CONTACTO_FISICO varchar(30),
        FECHA_INICIO_CONTACTO datetime,
        FECHA_FIN_CONTACTO datetime,
        NOMBRE_HOSPITAL varchar(50),
        DIRECCION_HOSPITAL varchar(80),
        UBICACION_VICTIMA varchar(80),
        FECHA_LLEGADA datetime,
        FECHA_RETIRO datetime,
        TRATAMIENTO varchar(50),
        EFECTIVIDAD int,
        FECHA_INICIO_TRATAMIENTO datetime,
        FECHA_FIN_TRATAMIENTO datetime,
        EFECTIVIDAD_EN_VICTIMA int
        );

        `);

        const peticion2 = await pool.query(` 
        LOAD DATA LOCAL INFILE '/home/jacky/Documentos/[MIA]PRACTICA1/GRAND_VIRUS_EPICENTER.csv'
        INTO TABLE TABLATEMPORAL
        FIELDS terminated by ';'
        ENCLOSED BY ''
        ESCAPED BY ''
        LINES TERMINATED BY '\n'
        IGNORE 1 ROWS;
        
        `);

        
        res.json(peticion);
        res.json(peticion2);

        }      
    
    public async getcargarModelo(req: Request,res: Response){ 
        const peticion = await pool.query(` 
        CREATE TABLE IF NOT EXISTS VICTIMA
        (
            ID_VICTIMA int not null primary key auto_increment,
            NOMBRE varchar(50) not null,
            APELLIDO varchar(50) not null,
            DIRECCION varchar(80) not null
        ); 

        `);

        const peticion1 = await pool.query(`        
        CREATE TABLE IF NOT EXISTS HOSPITAL
        (
            ID_HOSPITAL int not null primary key auto_increment,
            NOMBRE varchar(50) not null unique,
            DIRECCION varchar(80) not null
        );    
        `);

        const peticion2 = await pool.query(`        
        CREATE TABLE IF NOT EXISTS STATUSENFERMEDAD
        (
            ID_STATUS int not null primary key auto_increment,
            ESTADO varchar(30) not null
        );   
        `);

        const peticion3 = await pool.query(`        
        CREATE TABLE IF NOT EXISTS TIPOCONTACTO 
        (
            ID_TIPOCONTACTO int not null primary key auto_increment,
            CONTACTO varchar(30) not null
        );   
        `);

        const peticion4 = await pool.query(`        
        CREATE TABLE IF NOT EXISTS ASOCIADO
        (
            ID_ASOCIADO int not null primary key auto_increment,
            NOMBRE varchar(50) not null,
            APELLIDO varchar(50) not null
           
        );
   
        `);

        const peticion5 = await pool.query(`        
        CREATE TABLE IF NOT EXISTS LUGAR
        (
            ID_LUGAR int not null primary key auto_increment,
            UBICACION varchar(80) not null
        );    
        `);

        const peticion6 = await pool.query(`        
        CREATE TABLE IF NOT EXISTS TRATAMIENTO
        (
            ID_TRATAMIENTO int not null primary key auto_increment,
            NOMBRE varchar(50) not null,
            EFECTIVIDAD int not null
        );    
        `);

        const peticion7 = await pool.query(`        
        CREATE TABLE IF NOT EXISTS CONTROL_LUGAR
        (
            ID_LUGAR int not null,
            ID_VICTIMA int not null,
            PRIMARY KEY(ID_LUGAR, ID_VICTIMA),
            FOREIGN KEY (ID_LUGAR) REFERENCES LUGAR(ID_LUGAR),
            FOREIGN KEY (ID_VICTIMA) REFERENCES VICTIMA(ID_VICTIMA),
            FECHAHORALLEGADA datetime not null,
            FECHAHORASALIDA datetime not null
        ); 
        `);

        const peticion8 = await pool.query(`        
        CREATE TABLE IF NOT EXISTS CONTROLTRATAMIENTO
        (
            ID_VICTIMA int not null,
            ID_TRATAMIENTO int not null,
            PRIMARY KEY(ID_TRATAMIENTO, ID_VICTIMA),
            FOREIGN KEY (ID_VICTIMA) REFERENCES VICTIMA(ID_VICTIMA),
            FOREIGN KEY (ID_TRATAMIENTO) REFERENCES TRATAMIENTO(ID_TRATAMIENTO),
            EFECTIVIDADVICTIMA int not null,
            FECHAFIN datetime not null,
            FECHAINICIO datetime not null
            
        );
   
        `);

        const peticion9 = await pool.query(`        
        CREATE TABLE IF NOT EXISTS REGISTRO_VICTIMA
        (
            ID_VICTIMA int not null,
            ID_HOSPITAL int not null,
            ID_STATUS int not null,
            PRIMARY KEY(ID_HOSPITAL, ID_VICTIMA),
            FOREIGN KEY (ID_VICTIMA) REFERENCES VICTIMA(ID_VICTIMA),
            FOREIGN KEY (ID_HOSPITAL) REFERENCES HOSPITAL(ID_HOSPITAL),
            FOREIGN KEY (ID_STATUS) REFERENCES STATUSENFERMEDAD(ID_STATUS),
            FECHASOSPECHOSA datetime not null,
            FECHACONFIRMACION datetime not null,
            FECHAMUERTE datetime
        );   
        `);

        const peticion10 = await pool.query(`        
        CREATE TABLE IF NOT EXISTS VICTIMA_ASOCIADO
        (
            ID_ASOCIADO int not null,
            ID_VICTIMA int not null,
            ID_TIPOCONTACTO int,
            PRIMARY KEY(ID_ASOCIADO, ID_VICTIMA),
            FOREIGN KEY (ID_VICTIMA) REFERENCES VICTIMA(ID_VICTIMA),
            FOREIGN KEY (ID_ASOCIADO) REFERENCES ASOCIADO(ID_ASOCIADO),
            FOREIGN KEY (ID_TIPOCONTACTO) REFERENCES TIPOCONTACTO(ID_TIPOCONTACTO),
            FECHAINICIO datetime,
            FECHAFIN datetime,
            FECHACONOCIMIENTO datetime not null
        );    
        `);

        const peticion11 = await pool.query(`        
        INSERT IGNORE INTO VICTIMA(NOMBRE, APELLIDO, DIRECCION)
        SELECT DISTINCT NOMBRE_VICTIMA, APELLIDO_VICTIMA, DIRECCION_VICITMA FROM TABLATEMPORAL
        WHERE NOMBRE_VICTIMA!="";    
        `);

        const peticion12 = await pool.query(`        
        INSERT IGNORE INTO HOSPITAL(NOMBRE, DIRECCION)
        SELECT DISTINCT NOMBRE_HOSPITAL, DIRECCION_HOSPITAL FROM TABLATEMPORAL
        WHERE NOMBRE_HOSPITAL!="";    
        `);

        const peticion13 = await pool.query(`        
        INSERT IGNORE INTO TRATAMIENTO(NOMBRE, EFECTIVIDAD)
        SELECT DISTINCT TRATAMIENTO, EFECTIVIDAD FROM TABLATEMPORAL
        WHERE TRATAMIENTO!="";   
        `);

        const peticion14 = await pool.query(`        
        INSERT IGNORE INTO ASOCIADO(NOMBRE, APELLIDO)
        SELECT DISTINCT NOMBRE_ASOCIADO, APELLIDO_ASOCIADO FROM TABLATEMPORAL
        WHERE NOMBRE_ASOCIADO!="";    
        `);

        const peticion15 = await pool.query(`        
        INSERT IGNORE INTO LUGAR(UBICACION)
        SELECT DISTINCT UBICACION_VICTIMA FROM TABLATEMPORAL
        WHERE UBICACION_VICTIMA!="";   
        `);

        const peticion16 = await pool.query(`        
        INSERT IGNORE INTO TIPOCONTACTO(CONTACTO)
        SELECT DISTINCT CONTACTO_FISICO FROM TABLATEMPORAL
        WHERE CONTACTO_FISICO!="";    
        `);

        const peticion17 = await pool.query(`        
        INSERT IGNORE INTO STATUSENFERMEDAD(ESTADO)
        SELECT DISTINCT ESTADO_VICTIMA FROM TABLATEMPORAL
        WHERE ESTADO_VICTIMA!='';   
        `);

        const peticion18 = await pool.query(`        
        INSERT IGNORE INTO REGISTRO_VICTIMA(ID_VICTIMA,ID_HOSPITAL, ID_STATUS, FECHASOSPECHOSA, FECHACONFIRMACION, FECHAMUERTE)
        SELECT DISTINCT VIC.ID_VICTIMA, HOS.ID_HOSPITAL, STA.ID_STATUS, TT.FECHA_PRIMERA_SOSPECHA, TT.FECHA_CONFIRMACION, TT.FECHA_MUERTE
        FROM VICTIMA AS VIC, HOSPITAL AS HOS, STATUSENFERMEDAD AS STA, TABLATEMPORAL AS TT
        WHERE HOS.NOMBRE=TT.NOMBRE_HOSPITAL AND VIC.NOMBRE=TT.NOMBRE_VICTIMA AND VIC.APELLIDO=TT.APELLIDO_VICTIMA AND STA.ESTADO=TT.ESTADO_VICTIMA;
     
        `);

        const peticion19 = await pool.query(`        
        INSERT IGNORE INTO CONTROLTRATAMIENTO(ID_VICTIMA,ID_TRATAMIENTO,EFECTIVIDADVICTIMA, FECHAFIN, FECHAINICIO)
        SELECT DISTINCT VIC.ID_VICTIMA, TRA.ID_TRATAMIENTO, TT.EFECTIVIDAD_EN_VICTIMA,TT.FECHA_FIN_TRATAMIENTO, TT.FECHA_INICIO_TRATAMIENTO
        FROM  VICTIMA AS VIC, TRATAMIENTO AS TRA, TABLATEMPORAL AS TT
        WHERE VIC.NOMBRE=TT.NOMBRE_VICTIMA AND VIC.APELLIDO=TT.APELLIDO_VICTIMA AND TRA.NOMBRE=TT.TRATAMIENTO;
    
        `);

        const peticion20 = await pool.query(`        
        INSERT IGNORE INTO CONTROL_LUGAR(ID_LUGAR, ID_VICTIMA, FECHAHORALLEGADA, FECHAHORASALIDA)
        SELECT DISTINCT LU.ID_LUGAR, VIC.ID_VICTIMA, TT.FECHA_LLEGADA, TT.FECHA_RETIRO
        FROM TABLATEMPORAL AS TT, LUGAR AS LU, VICTIMA AS VIC 
        WHERE LU.UBICACION=TT.UBICACION_VICTIMA AND VIC.NOMBRE=TT.NOMBRE_VICTIMA AND VIC.APELLIDO=TT.APELLIDO_VICTIMA;
     
        `);

        const peticion21 = await pool.query(`        
        INSERT IGNORE INTO VICTIMA_ASOCIADO(ID_ASOCIADO,ID_VICTIMA,ID_TIPOCONTACTO, FECHAINICIO, FECHAFIN, FECHACONOCIMIENTO)
        SELECT DISTINCT ASOC.ID_ASOCIADO, VIC.ID_VICTIMA, TC.ID_TIPOCONTACTO, TT.FECHA_INICIO_CONTACTO, TT.FECHA_FIN_CONTACTO, TT.FECHA_CONOCIO
        FROM TABLATEMPORAL AS TT, ASOCIADO AS ASOC, VICTIMA AS VIC, TIPOCONTACTO AS TC
        WHERE  ASOC.NOMBRE=TT.NOMBRE_ASOCIADO AND ASOC.APELLIDO=TT.APELLIDO_ASOCIADO AND VIC.NOMBRE=TT.NOMBRE_VICTIMA AND VIC.APELLIDO=TT.APELLIDO_VICTIMA AND TC.CONTACTO=TT.CONTACTO_FISICO AND TT.FECHA_CONOCIO!=0;   
        `);

        res.json(peticion);
        res.json(peticion1);
        res.json(peticion2);
        res.json(peticion3);
        res.json(peticion4);
        res.json(peticion5);
        res.json(peticion6);
        res.json(peticion7);
        res.json(peticion8);
        res.json(peticion9);
        res.json(peticion10);
        res.json(peticion11);
        res.json(peticion12);
        res.json(peticion13);
        res.json(peticion14);
        res.json(peticion15);
        res.json(peticion16);
        res.json(peticion17);
        res.json(peticion18);
        res.json(peticion19);
        res.json(peticion20);
        res.json(peticion21);
        }      
    
}

export const apiController=new ApiController();
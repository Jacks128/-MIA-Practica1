/*-------------------CONSULTA 1--------------------------*/
SELECT count(*)
FROM REGISTRO_VICTIMA
WHERE FECHAMUERTE!=0 AND ID_HOSPITAL=4;

/*--------------------------------------------------------------------*/
SELECT HOSPITAL.NOMBRE, HOSPITAL.DIRECCION, count(REGISTRO_VICTIMA.FECHAMUERTE) AS CANTIDAD_MUERTES
FROM HOSPITAL
INNER JOIN REGISTRO_VICTIMA
ON REGISTRO_VICTIMA.ID_HOSPITAL=HOSPITAL.ID_HOSPITAL
WHERE REGISTRO_VICTIMA.FECHAMUERTE!=0
group by HOSPITAL.NOMBRE, HOSPITAL.DIRECCION;
/*--------------------------------------------------------------------*/

/*-------------------CONSULTA 2--------------------------*/

	SELECT * FROM TRATAMIENTO;
    SELECT * FROM CONTROLTRATAMIENTO;
    SELECT * FROM REGISTRO_VICTIMA;
    
/*--------------------------------------------------------------------*/
	SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO
	FROM VICTIMA 
    INNER JOIN REGISTRO_VICTIMA
    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA
	INNER JOIN CONTROLTRATAMIENTO
    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA
    WHERE REGISTRO_VICTIMA.ID_STATUS=2 AND CONTROLTRATAMIENTO.ID_TRATAMIENTO=2 AND  CONTROLTRATAMIENTO.EFECTIVIDADVICTIMA>5
    ORDER BY VICTIMA.NOMBRE ASC;
/*--------------------------------------------------------------------*/    

/*-------------------CONSULTA 3--------------------------*/
SELECT * FROM STATUSENFERMEDAD;
	
/*--------------------------------------------------------------------*/
SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA.DIRECCION, COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO) AS NUMEROASOC
FROM VICTIMA
INNER JOIN REGISTRO_VICTIMA
ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA
INNER JOIN VICTIMA_ASOCIADO
ON VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA
WHERE REGISTRO_VICTIMA.ID_STATUS=12
GROUP BY VICTIMA.NOMBRE,VICTIMA.APELLIDO,VICTIMA.ID_VICTIMA
HAVING COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO)>3;
/*--------------------------------------------------------------------*/

/*-------------------CONSULTA 4--------------------------*/
SELECT * FROM TIPOCONTACTO;

SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO, COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO) AS NUMEROASOC, VICTIMA_ASOCIADO.ID_TIPOCONTACTO
FROM VICTIMA
INNER JOIN REGISTRO_VICTIMA
ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA
INNER JOIN VICTIMA_ASOCIADO
ON VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA
WHERE VICTIMA_ASOCIADO.ID_TIPOCONTACTO=6
GROUP BY VICTIMA.NOMBRE,VICTIMA.APELLIDO,VICTIMA.ID_VICTIMA
HAVING COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO)>2;

/*-------------------CONSULTA 5--------------------------*/
SELECT * FROM TRATAMIENTO;

SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO
FROM VICTIMA
INNER JOIN CONTROLTRATAMIENTO
ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA
WHERE CONTROLTRATAMIENTO.ID_TRATAMIENTO=3
GROUP BY VICTIMA.NOMBRE,VICTIMA.APELLIDO,VICTIMA.ID_VICTIMA
ORDER BY  COUNT(CONTROLTRATAMIENTO.ID_TRATAMIENTO) LIMIT 5;

/*-------------------CONSULTA 6--------------------------*/
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
WHERE LUGAR.UBICACION="1987 Delphine Well" AND CONTROLTRATAMIENTO.ID_TRATAMIENTO=1;


/*-------------------CONSULTA 7--------------------------*/
SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA.DIRECCION
FROM VICTIMA
INNER JOIN VICTIMA_ASOCIADO
ON VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA
INNER JOIN CONTROLTRATAMIENTO
ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA
WHERE VICTIMA_ASOCIADO.ID_ASOCIADO 
GROUP BY VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA.DIRECCION
HAVING COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO)<2;

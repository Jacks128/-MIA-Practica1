"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiController = void 0;
var database_1 = __importDefault(require("../../database"));
var ApiController = /** @class */ (function () {
    function ApiController() {
    }
    ApiController.prototype.getConsulta1 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n     SELECT HOSPITAL.NOMBRE, HOSPITAL.DIRECCION, count(REGISTRO_VICTIMA.FECHAMUERTE) AS CANTIDAD_MUERTES\n    FROM HOSPITAL\n    INNER JOIN REGISTRO_VICTIMA\n    ON REGISTRO_VICTIMA.ID_HOSPITAL=HOSPITAL.ID_HOSPITAL\n    WHERE REGISTRO_VICTIMA.FECHAMUERTE!=0\n    group by HOSPITAL.NOMBRE, HOSPITAL.DIRECCION;")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getConsulta2 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n    SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO\n\tFROM VICTIMA \n    INNER JOIN REGISTRO_VICTIMA\n    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA\n\tINNER JOIN CONTROLTRATAMIENTO\n    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    WHERE REGISTRO_VICTIMA.ID_STATUS=2 AND CONTROLTRATAMIENTO.ID_TRATAMIENTO=2 AND  CONTROLTRATAMIENTO.EFECTIVIDADVICTIMA>5\n    ORDER BY VICTIMA.NOMBRE ASC;")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getConsulta3 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query(" \n    SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA.DIRECCION, COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO) AS NUMEROASOC\n    FROM VICTIMA\n    INNER JOIN REGISTRO_VICTIMA\n    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    INNER JOIN VICTIMA_ASOCIADO\n    ON VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    WHERE REGISTRO_VICTIMA.FECHAMUERTE IS NOT NULL\n    group by VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA.DIRECCION\n    having NUMEROASOC>3;")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getConsulta4 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n    SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO, COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO) AS NUMEROASOC, VICTIMA_ASOCIADO.ID_TIPOCONTACTO\n    FROM VICTIMA\n    INNER JOIN REGISTRO_VICTIMA\n    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    INNER JOIN VICTIMA_ASOCIADO\n    ON VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    WHERE REGISTRO_VICTIMA.ID_STATUS=5 AND VICTIMA_ASOCIADO.ID_TIPOCONTACTO=6\n    GROUP BY VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA_ASOCIADO.ID_TIPOCONTACTO\n    HAVING NUMEROASOC>=2;")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getConsulta5 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query(" \n    SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO\n    FROM VICTIMA\n    INNER JOIN CONTROLTRATAMIENTO\n    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    WHERE CONTROLTRATAMIENTO.ID_TRATAMIENTO=3\n    GROUP BY VICTIMA.NOMBRE,VICTIMA.APELLIDO,VICTIMA.ID_VICTIMA\n    ORDER BY  COUNT(CONTROLTRATAMIENTO.ID_TRATAMIENTO) LIMIT 5;")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getConsulta6 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query(" \n    SELECT VICTIMA.NOMBRE, VICTIMA.APELLIDO, REGISTRO_VICTIMA.FECHAMUERTE\n    FROM VICTIMA\n    INNER JOIN REGISTRO_VICTIMA\n    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    INNER JOIN CONTROLTRATAMIENTO\n    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    INNER JOIN CONTROL_LUGAR\n    ON CONTROL_LUGAR.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    INNER JOIN LUGAR \n    ON LUGAR.ID_LUGAR=CONTROL_LUGAR.ID_LUGAR\n    WHERE LUGAR.UBICACION=\"1987 Delphine Well\" AND CONTROLTRATAMIENTO.ID_TRATAMIENTO=1;")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getConsulta7 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n    SELECT DISTINCT VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA.DIRECCION, COUNT(CONTROLTRATAMIENTO.ID_TRATAMIENTO)=2 AS TRATAMIENTO, COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO) AS ASOCIADOS\n    FROM VICTIMA\n    INNER JOIN VICTIMA_ASOCIADO\n    ON VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    INNER JOIN CONTROLTRATAMIENTO\n    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    INNER JOIN REGISTRO_VICTIMA\n    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    INNER JOIN HOSPITAL\n    ON REGISTRO_VICTIMA.ID_HOSPITAL=HOSPITAL.ID_HOSPITAL\n    WHERE (SELECT DISTINCT COUNT(VICTIMA_ASOCIADO.ID_ASOCIADO) FROM VICTIMA_ASOCIADO WHERE VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA)<2\n    GROUP BY VICTIMA.NOMBRE, VICTIMA.APELLIDO, VICTIMA.DIRECCION\n    HAVING  COUNT(CONTROLTRATAMIENTO.ID_TRATAMIENTO)=2 ;")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getConsulta8 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n    (SELECT month(REGISTRO_VICTIMA.FECHASOSPECHOSA) AS MES, VICTIMA.NOMBRE, VICTIMA.APELLIDO, COUNT(CONTROLTRATAMIENTO.ID_TRATAMIENTO) AS TRATA\n    FROM VICTIMA\n    INNER JOIN CONTROLTRATAMIENTO\n    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    INNER JOIN REGISTRO_VICTIMA\n    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    GROUP BY VICTIMA.NOMBRE, MES, VICTIMA.APELLIDO\n     ORDER BY TRATA DESC LIMIT 10)\n    UNION \n    (SELECT month(REGISTRO_VICTIMA.FECHASOSPECHOSA) AS MES, VICTIMA.NOMBRE, VICTIMA.APELLIDO, COUNT(CONTROLTRATAMIENTO.ID_TRATAMIENTO) AS TRATA\n    FROM VICTIMA\n    INNER JOIN CONTROLTRATAMIENTO\n    ON CONTROLTRATAMIENTO.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    INNER JOIN REGISTRO_VICTIMA\n    ON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA\n    GROUP BY VICTIMA.NOMBRE, MES, VICTIMA.APELLIDO\n     ORDER BY TRATA ASC LIMIT 10);")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getConsulta9 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n    SELECT HOSPITAL.NOMBRE,((SELECT COUNT(HOSPITAL.ID_HOSPITAL))*100/(SELECT count(REGISTRO_VICTIMA.ID_VICTIMA) FROM REGISTRO_VICTIMA)) AS NUMERADOR\n    FROM HOSPITAL\n    INNER JOIN REGISTRO_VICTIMA\n    ON REGISTRO_VICTIMA.ID_HOSPITAL=HOSPITAL.ID_HOSPITAL\n    group by HOSPITAL.NOMBRE;\n    ")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getConsulta10 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query(" \n    SELECT HOSPITAL.NOMBRE, TIPOCONTACTO.CONTACTO, \n    (\n    ((COUNT(TIPOCONTACTO.ID_TIPOCONTACTO))*100)/(SELECT COUNT(VICTIMA_ASOCIADO.ID_TIPOCONTACTO) FROM VICTIMA_ASOCIADO)\n    ) AS PORCENTAJE\n\tFROM VICTIMA_ASOCIADO\n\tINNER JOIN TIPOCONTACTO\n\tON VICTIMA_ASOCIADO.ID_TIPOCONTACTO=TIPOCONTACTO.ID_TIPOCONTACTO\n\tINNER JOIN VICTIMA\n\tON VICTIMA_ASOCIADO.ID_VICTIMA=VICTIMA.ID_VICTIMA\n\tINNER JOIN REGISTRO_VICTIMA\n\tON REGISTRO_VICTIMA.ID_VICTIMA=VICTIMA.ID_VICTIMA\n\tINNER JOIN HOSPITAL\n\tON REGISTRO_VICTIMA.ID_HOSPITAL=HOSPITAL.ID_HOSPITAL\n\tGROUP BY HOSPITAL.NOMBRE, TIPOCONTACTO.CONTACTO\n    ORDER BY HOSPITAL.ID_HOSPITAL;")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.geteliminarTemporal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query(" \n        DROP TABLE TABLATEMPORAL;\n        ")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.geteliminarModelo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion, peticion1, peticion2, peticion3, peticion4, peticion5, peticion6, peticion7, peticion8, peticion9, peticion10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query(" \n        DROP TABLE CONTROLTRATAMIENTO;\n     \n        ")];
                    case 1:
                        peticion = _a.sent();
                        return [4 /*yield*/, database_1.default.query(" \n        DROP TABLE REGISTRO_VICTIMA;\n     \n        ")];
                    case 2:
                        peticion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query(" \n        DROP TABLE VICTIMA_ASOCIADO;\n     \n        ")];
                    case 3:
                        peticion2 = _a.sent();
                        return [4 /*yield*/, database_1.default.query(" \n        DROP TABLE CONTROL_LUGAR;\n     \n        ")];
                    case 4:
                        peticion3 = _a.sent();
                        return [4 /*yield*/, database_1.default.query(" \n        DROP TABLE TIPOCONTACTO;\n     \n        ")];
                    case 5:
                        peticion4 = _a.sent();
                        return [4 /*yield*/, database_1.default.query(" \n        DROP TABLE STATUSENFERMEDAD;\n     \n        ")];
                    case 6:
                        peticion5 = _a.sent();
                        return [4 /*yield*/, database_1.default.query(" \n        DROP TABLE VICTIMA;\n     \n        ")];
                    case 7:
                        peticion6 = _a.sent();
                        return [4 /*yield*/, database_1.default.query(" \n        DROP TABLE HOSPITAL;\n     \n        ")];
                    case 8:
                        peticion7 = _a.sent();
                        return [4 /*yield*/, database_1.default.query(" \n        DROP TABLE TRATAMIENTO;\n     \n        ")];
                    case 9:
                        peticion8 = _a.sent();
                        return [4 /*yield*/, database_1.default.query(" \n        DROP TABLE ASOCIADO;\n     \n        ")];
                    case 10:
                        peticion9 = _a.sent();
                        return [4 /*yield*/, database_1.default.query(" \n        DROP TABLE LUGAR;\n     \n        ")];
                    case 11:
                        peticion10 = _a.sent();
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
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getcargarTemporal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion, peticion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query(" \n        CREATE TABLE IF NOT EXISTS TABLATEMPORAL\n        (\n        NOMBRE_VICTIMA varchar(50),\n        APELLIDO_VICTIMA varchar(50),\n        DIRECCION_VICITMA varchar(80),\n        FECHA_PRIMERA_SOSPECHA datetime,\n        FECHA_CONFIRMACION datetime,\n        FECHA_MUERTE datetime,\n        ESTADO_VICTIMA varchar(30),\n        NOMBRE_ASOCIADO varchar(50),\n        APELLIDO_ASOCIADO varchar(50),\n        FECHA_CONOCIO datetime,\n        CONTACTO_FISICO varchar(30),\n        FECHA_INICIO_CONTACTO datetime,\n        FECHA_FIN_CONTACTO datetime,\n        NOMBRE_HOSPITAL varchar(50),\n        DIRECCION_HOSPITAL varchar(80),\n        UBICACION_VICTIMA varchar(80),\n        FECHA_LLEGADA datetime,\n        FECHA_RETIRO datetime,\n        TRATAMIENTO varchar(50),\n        EFECTIVIDAD int,\n        FECHA_INICIO_TRATAMIENTO datetime,\n        FECHA_FIN_TRATAMIENTO datetime,\n        EFECTIVIDAD_EN_VICTIMA int\n        );\n\n        ")];
                    case 1:
                        peticion = _a.sent();
                        return [4 /*yield*/, database_1.default.query(" \n        LOAD DATA LOCAL INFILE '/home/jacky/Documentos/[MIA]PRACTICA1/GRAND_VIRUS_EPICENTER.csv'\n        INTO TABLE TABLATEMPORAL\n        FIELDS terminated by ';'\n        ENCLOSED BY ''\n        ESCAPED BY ''\n        LINES TERMINATED BY '\n'\n        IGNORE 1 ROWS;\n        \n        ")];
                    case 2:
                        peticion2 = _a.sent();
                        res.json(peticion);
                        res.json(peticion2);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getcargarModelo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion, peticion1, peticion2, peticion3, peticion4, peticion5, peticion6, peticion7, peticion8, peticion9, peticion10, peticion11, peticion12, peticion13, peticion14, peticion15, peticion16, peticion17, peticion18, peticion19, peticion20, peticion21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query(" \n        CREATE TABLE IF NOT EXISTS VICTIMA\n        (\n            ID_VICTIMA int not null primary key auto_increment,\n            NOMBRE varchar(50) not null,\n            APELLIDO varchar(50) not null,\n            DIRECCION varchar(80) not null\n        ); \n\n        ")];
                    case 1:
                        peticion = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        CREATE TABLE IF NOT EXISTS HOSPITAL\n        (\n            ID_HOSPITAL int not null primary key auto_increment,\n            NOMBRE varchar(50) not null unique,\n            DIRECCION varchar(80) not null\n        );    \n        ")];
                    case 2:
                        peticion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        CREATE TABLE IF NOT EXISTS STATUSENFERMEDAD\n        (\n            ID_STATUS int not null primary key auto_increment,\n            ESTADO varchar(30) not null\n        );   \n        ")];
                    case 3:
                        peticion2 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        CREATE TABLE IF NOT EXISTS TIPOCONTACTO \n        (\n            ID_TIPOCONTACTO int not null primary key auto_increment,\n            CONTACTO varchar(30) not null\n        );   \n        ")];
                    case 4:
                        peticion3 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        CREATE TABLE IF NOT EXISTS ASOCIADO\n        (\n            ID_ASOCIADO int not null primary key auto_increment,\n            NOMBRE varchar(50) not null,\n            APELLIDO varchar(50) not null\n           \n        );\n   \n        ")];
                    case 5:
                        peticion4 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        CREATE TABLE IF NOT EXISTS LUGAR\n        (\n            ID_LUGAR int not null primary key auto_increment,\n            UBICACION varchar(80) not null\n        );    \n        ")];
                    case 6:
                        peticion5 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        CREATE TABLE IF NOT EXISTS TRATAMIENTO\n        (\n            ID_TRATAMIENTO int not null primary key auto_increment,\n            NOMBRE varchar(50) not null,\n            EFECTIVIDAD int not null\n        );    \n        ")];
                    case 7:
                        peticion6 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        CREATE TABLE IF NOT EXISTS CONTROL_LUGAR\n        (\n            ID_LUGAR int not null,\n            ID_VICTIMA int not null,\n            PRIMARY KEY(ID_LUGAR, ID_VICTIMA),\n            FOREIGN KEY (ID_LUGAR) REFERENCES LUGAR(ID_LUGAR),\n            FOREIGN KEY (ID_VICTIMA) REFERENCES VICTIMA(ID_VICTIMA),\n            FECHAHORALLEGADA datetime not null,\n            FECHAHORASALIDA datetime not null\n        ); \n        ")];
                    case 8:
                        peticion7 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        CREATE TABLE IF NOT EXISTS CONTROLTRATAMIENTO\n        (\n            ID_VICTIMA int not null,\n            ID_TRATAMIENTO int not null,\n            PRIMARY KEY(ID_TRATAMIENTO, ID_VICTIMA),\n            FOREIGN KEY (ID_VICTIMA) REFERENCES VICTIMA(ID_VICTIMA),\n            FOREIGN KEY (ID_TRATAMIENTO) REFERENCES TRATAMIENTO(ID_TRATAMIENTO),\n            EFECTIVIDADVICTIMA int not null,\n            FECHAFIN datetime not null,\n            FECHAINICIO datetime not null\n            \n        );\n   \n        ")];
                    case 9:
                        peticion8 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        CREATE TABLE IF NOT EXISTS REGISTRO_VICTIMA\n        (\n            ID_VICTIMA int not null,\n            ID_HOSPITAL int not null,\n            ID_STATUS int not null,\n            PRIMARY KEY(ID_HOSPITAL, ID_VICTIMA),\n            FOREIGN KEY (ID_VICTIMA) REFERENCES VICTIMA(ID_VICTIMA),\n            FOREIGN KEY (ID_HOSPITAL) REFERENCES HOSPITAL(ID_HOSPITAL),\n            FOREIGN KEY (ID_STATUS) REFERENCES STATUSENFERMEDAD(ID_STATUS),\n            FECHASOSPECHOSA datetime not null,\n            FECHACONFIRMACION datetime not null,\n            FECHAMUERTE datetime\n        );   \n        ")];
                    case 10:
                        peticion9 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        CREATE TABLE IF NOT EXISTS VICTIMA_ASOCIADO\n        (\n            ID_ASOCIADO int not null,\n            ID_VICTIMA int not null,\n            ID_TIPOCONTACTO int,\n            PRIMARY KEY(ID_ASOCIADO, ID_VICTIMA),\n            FOREIGN KEY (ID_VICTIMA) REFERENCES VICTIMA(ID_VICTIMA),\n            FOREIGN KEY (ID_ASOCIADO) REFERENCES ASOCIADO(ID_ASOCIADO),\n            FOREIGN KEY (ID_TIPOCONTACTO) REFERENCES TIPOCONTACTO(ID_TIPOCONTACTO),\n            FECHAINICIO datetime,\n            FECHAFIN datetime,\n            FECHACONOCIMIENTO datetime not null\n        );    \n        ")];
                    case 11:
                        peticion10 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        INSERT IGNORE INTO VICTIMA(NOMBRE, APELLIDO, DIRECCION)\n        SELECT DISTINCT NOMBRE_VICTIMA, APELLIDO_VICTIMA, DIRECCION_VICITMA FROM TABLATEMPORAL\n        WHERE NOMBRE_VICTIMA!=\"\";    \n        ")];
                    case 12:
                        peticion11 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        INSERT IGNORE INTO HOSPITAL(NOMBRE, DIRECCION)\n        SELECT DISTINCT NOMBRE_HOSPITAL, DIRECCION_HOSPITAL FROM TABLATEMPORAL\n        WHERE NOMBRE_HOSPITAL!=\"\";    \n        ")];
                    case 13:
                        peticion12 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        INSERT IGNORE INTO TRATAMIENTO(NOMBRE, EFECTIVIDAD)\n        SELECT DISTINCT TRATAMIENTO, EFECTIVIDAD FROM TABLATEMPORAL\n        WHERE TRATAMIENTO!=\"\";   \n        ")];
                    case 14:
                        peticion13 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        INSERT IGNORE INTO ASOCIADO(NOMBRE, APELLIDO)\n        SELECT DISTINCT NOMBRE_ASOCIADO, APELLIDO_ASOCIADO FROM TABLATEMPORAL\n        WHERE NOMBRE_ASOCIADO!=\"\";    \n        ")];
                    case 15:
                        peticion14 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        INSERT IGNORE INTO LUGAR(UBICACION)\n        SELECT DISTINCT UBICACION_VICTIMA FROM TABLATEMPORAL\n        WHERE UBICACION_VICTIMA!=\"\";   \n        ")];
                    case 16:
                        peticion15 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        INSERT IGNORE INTO TIPOCONTACTO(CONTACTO)\n        SELECT DISTINCT CONTACTO_FISICO FROM TABLATEMPORAL\n        WHERE CONTACTO_FISICO!=\"\";    \n        ")];
                    case 17:
                        peticion16 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        INSERT IGNORE INTO STATUSENFERMEDAD(ESTADO)\n        SELECT DISTINCT ESTADO_VICTIMA FROM TABLATEMPORAL\n        WHERE ESTADO_VICTIMA!='';   \n        ")];
                    case 18:
                        peticion17 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        INSERT IGNORE INTO REGISTRO_VICTIMA(ID_VICTIMA,ID_HOSPITAL, ID_STATUS, FECHASOSPECHOSA, FECHACONFIRMACION, FECHAMUERTE)\n        SELECT DISTINCT VIC.ID_VICTIMA, HOS.ID_HOSPITAL, STA.ID_STATUS, TT.FECHA_PRIMERA_SOSPECHA, TT.FECHA_CONFIRMACION, TT.FECHA_MUERTE\n        FROM VICTIMA AS VIC, HOSPITAL AS HOS, STATUSENFERMEDAD AS STA, TABLATEMPORAL AS TT\n        WHERE HOS.NOMBRE=TT.NOMBRE_HOSPITAL AND VIC.NOMBRE=TT.NOMBRE_VICTIMA AND VIC.APELLIDO=TT.APELLIDO_VICTIMA AND STA.ESTADO=TT.ESTADO_VICTIMA;\n     \n        ")];
                    case 19:
                        peticion18 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        INSERT IGNORE INTO CONTROLTRATAMIENTO(ID_VICTIMA,ID_TRATAMIENTO,EFECTIVIDADVICTIMA, FECHAFIN, FECHAINICIO)\n        SELECT DISTINCT VIC.ID_VICTIMA, TRA.ID_TRATAMIENTO, TT.EFECTIVIDAD_EN_VICTIMA,TT.FECHA_FIN_TRATAMIENTO, TT.FECHA_INICIO_TRATAMIENTO\n        FROM  VICTIMA AS VIC, TRATAMIENTO AS TRA, TABLATEMPORAL AS TT\n        WHERE VIC.NOMBRE=TT.NOMBRE_VICTIMA AND VIC.APELLIDO=TT.APELLIDO_VICTIMA AND TRA.NOMBRE=TT.TRATAMIENTO;\n    \n        ")];
                    case 20:
                        peticion19 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        INSERT IGNORE INTO CONTROL_LUGAR(ID_LUGAR, ID_VICTIMA, FECHAHORALLEGADA, FECHAHORASALIDA)\n        SELECT DISTINCT LU.ID_LUGAR, VIC.ID_VICTIMA, TT.FECHA_LLEGADA, TT.FECHA_RETIRO\n        FROM TABLATEMPORAL AS TT, LUGAR AS LU, VICTIMA AS VIC \n        WHERE LU.UBICACION=TT.UBICACION_VICTIMA AND VIC.NOMBRE=TT.NOMBRE_VICTIMA AND VIC.APELLIDO=TT.APELLIDO_VICTIMA;\n     \n        ")];
                    case 21:
                        peticion20 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("        \n        INSERT IGNORE INTO VICTIMA_ASOCIADO(ID_ASOCIADO,ID_VICTIMA,ID_TIPOCONTACTO, FECHAINICIO, FECHAFIN, FECHACONOCIMIENTO)\n        SELECT DISTINCT ASOC.ID_ASOCIADO, VIC.ID_VICTIMA, TC.ID_TIPOCONTACTO, TT.FECHA_INICIO_CONTACTO, TT.FECHA_FIN_CONTACTO, TT.FECHA_CONOCIO\n        FROM TABLATEMPORAL AS TT, ASOCIADO AS ASOC, VICTIMA AS VIC, TIPOCONTACTO AS TC\n        WHERE  ASOC.NOMBRE=TT.NOMBRE_ASOCIADO AND ASOC.APELLIDO=TT.APELLIDO_ASOCIADO AND VIC.NOMBRE=TT.NOMBRE_VICTIMA AND VIC.APELLIDO=TT.APELLIDO_VICTIMA AND TC.CONTACTO=TT.CONTACTO_FISICO AND TT.FECHA_CONOCIO!=0;   \n        ")];
                    case 22:
                        peticion21 = _a.sent();
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
                        return [2 /*return*/];
                }
            });
        });
    };
    return ApiController;
}());
exports.apiController = new ApiController();

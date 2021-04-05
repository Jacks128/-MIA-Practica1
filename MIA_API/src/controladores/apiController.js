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
    return ApiController;
}());
exports.apiController = new ApiController();

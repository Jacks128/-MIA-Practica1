"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servidor = void 0;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var apiRoutes_1 = __importDefault(require("./src/rutas/apiRoutes"));
var server = /** @class */ (function () {
    function server() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    };
    server.prototype.routes = function () {
        this.app.use('/Practica1', apiRoutes_1.default);
    };
    server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log('servidor se encuentra en: ', _this.app.get('port'));
        });
    };
    return server;
}());
exports.servidor = new server();
exports.servidor.start();

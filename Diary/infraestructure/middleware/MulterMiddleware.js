"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleImage = void 0;
const multer_1 = __importDefault(require("multer"));
// Configuración de almacenamiento en memoria
const storage = multer_1.default.memoryStorage(); // Guarda el archivo en memoria temporalmente
// Configurar Multer para manejar un solo archivo con la clave 'image'
exports.uploadSingleImage = (0, multer_1.default)({ storage }).single('image');

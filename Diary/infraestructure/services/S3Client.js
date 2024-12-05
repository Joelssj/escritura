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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
require("dotenv/config");
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN, // Incluye el token si es necesario
    region: process.env.AWS_REGION, // Región de AWS donde está el bucket
});
const uploadToS3 = (fileContent, // Contenido del archivo
fileName, // Nombre del archivo
bucketName) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: bucketName,
        Key: fileName, // Nombre del archivo en el bucket
        Body: fileContent, // Contenido del archivo
        ContentType: 'image/jpeg', // Asegura el tipo de contenido (ajusta si es necesario)
    };
    const data = yield s3.upload(params).promise(); // Subida a S3
    return data.Location; // Retorna la URL del archivo
});
exports.uploadToS3 = uploadToS3;

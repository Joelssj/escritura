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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryController = void 0;
const Diary_1 = require("../../domain/Diary");
const uuid_1 = require("uuid");
const S3Client_1 = require("../services/S3Client");
class DiaryController {
    constructor(saveDiaryUseCase) {
        this.saveDiaryUseCase = saveDiaryUseCase;
    }
    saveDiary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userUuid, comment, date, time } = req.body;
            // Verifica que el archivo haya sido procesado correctamente
            if (!userUuid || !req.file || !comment || !date || !time) {
                return res.status(400).json({ message: 'Faltan datos' });
            }
            try {
                // Procesa la imagen y súbela al bucket
                const fileContent = req.file.buffer; // Contenido del archivo desde multer
                const fileName = `diaries/${(0, uuid_1.v4)()}_${req.file.originalname}`; // Nombre único del archivo
                const bucketName = process.env.AWS_BUCKET_NAME; // Bucket desde las variables de entorno
                if (!bucketName) {
                    throw new Error('El nombre del bucket no está configurado en las variables de entorno');
                }
                const imageUrl = yield (0, S3Client_1.uploadToS3)(fileContent, fileName, bucketName);
                // Crea la entrada del diario con la URL de la imagen
                const diary = new Diary_1.Diary((0, uuid_1.v4)(), userUuid, imageUrl, comment, date, time);
                yield this.saveDiaryUseCase.execute(diary);
                return res.status(201).json({ message: 'Diario guardado', diary });
            }
            catch (error) {
                console.error('Error al guardar el diario:', error);
                return res.status(500).json({ message: 'Error al guardar el diario', error: error });
            }
        });
    }
}
exports.DiaryController = DiaryController;

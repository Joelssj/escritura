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
exports.GetAllDiariesController = void 0;
class GetAllDiariesController {
    constructor(getAllDiariesUseCase) {
        this.getAllDiariesUseCase = getAllDiariesUseCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Llama al caso de uso para obtener todos los diarios
                const diaries = yield this.getAllDiariesUseCase.execute();
                return res.status(200).json(diaries); // Devuelve la respuesta al cliente
            }
            catch (error) {
                console.error('Error al obtener los diarios:', error);
                return res.status(500).json({ message: 'Error al obtener los diarios' });
            }
        });
    }
}
exports.GetAllDiariesController = GetAllDiariesController;

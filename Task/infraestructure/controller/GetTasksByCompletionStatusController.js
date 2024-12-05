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
exports.GetTasksByCompletionStatusController = void 0;
class GetTasksByCompletionStatusController {
    constructor(getTasksByCompletionStatusUseCase) {
        this.getTasksByCompletionStatusUseCase = getTasksByCompletionStatusUseCase;
    }
    // Método para manejar la solicitud y pasar el userUuid como parámetro
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userUuid } = req.params; // Obtenemos el userUuid desde los parámetros de la ruta
                if (!userUuid) {
                    return res.status(400).json({ message: 'El parámetro userUuid es obligatorio' });
                }
                // Aquí puedes usar 'userUuid' para ejecutar el caso de uso
                const result = yield this.getTasksByCompletionStatusUseCase.execute(userUuid);
                return res.status(200).json(result);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error al obtener las tareas', error });
            }
        });
    }
}
exports.GetTasksByCompletionStatusController = GetTasksByCompletionStatusController;

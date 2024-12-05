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
exports.GetAllTasksController = void 0;
class GetAllTasksController {
    constructor(getAllTasksUseCase) {
        this.getAllTasksUseCase = getAllTasksUseCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Llama al caso de uso para obtener todas las tareas
                const tasks = yield this.getAllTasksUseCase.execute();
                // Devuelve las tareas en formato JSON
                return res.status(200).json(tasks);
            }
            catch (error) {
                console.error('Error al obtener todas las tareas:', error);
                // Devuelve un error 500 si algo falla
                return res.status(500).json({ message: 'Error al obtener las tareas' });
            }
        });
    }
}
exports.GetAllTasksController = GetAllTasksController;

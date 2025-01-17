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
exports.GetTaskTimelineUseCase = void 0;
class GetTaskTimelineUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            // Llama al repositorio para obtener los datos y los incluye en el resultado
            const tasks = yield this.taskRepository.getTaskTimeline();
            // Aquí, si es necesario, puedes agregar el userUuid de alguna manera
            return tasks.map(task => ({
                date: task.date,
                taskName: task.taskName,
                priority: task.priority,
                type: task.type,
                completed: task.completed,
                userUuid: task.userUuid // Asegúrate de que el repositorio devuelve esto correctamente
            }));
        });
    }
}
exports.GetTaskTimelineUseCase = GetTaskTimelineUseCase;

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
exports.GetTasksByCompletionStatusUseCase = void 0;
class GetTasksByCompletionStatusUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    // Este método toma el userUuid y un valor booleano para determinar si se buscan tareas completadas o no completadas
    execute(userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtener tareas completadas
            const completedTasks = yield this.taskRepository.getTasksByCompletionStatus(userUuid, true);
            // Obtener tareas no completadas
            const incompleteTasks = yield this.taskRepository.getTasksByCompletionStatus(userUuid, false);
            // Agrupar las tareas por día de la semana
            const tasksByDay = this.groupTasksByDayOfWeek(completedTasks, incompleteTasks);
            // Devolver el resultado
            return tasksByDay;
        });
    }
    // Método para agrupar las tareas por día de la semana
    groupTasksByDayOfWeek(completedTasks, incompleteTasks) {
        // Los días de la semana, comenzando desde lunes hasta domingo
        const daysOfWeek = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
        // Inicializamos el objeto con los días de la semana
        const tasksGroupedByDay = daysOfWeek.map(day => ({
            day,
            completedTasksCount: 0,
            incompleteTasksCount: 0,
            date: ''
        }));
        // Agrupar tareas completadas por día de la semana
        completedTasks.forEach(task => {
            const dayIndex = new Date(task.date).getDay(); // Obtener el día de la semana (0=domingo, 1=lunes, ...)
            tasksGroupedByDay[dayIndex].completedTasksCount++;
            tasksGroupedByDay[dayIndex].date = task.date; // Usamos la fecha de la tarea
        });
        // Agrupar tareas no completadas por día de la semana
        incompleteTasks.forEach(task => {
            const dayIndex = new Date(task.date).getDay();
            tasksGroupedByDay[dayIndex].incompleteTasksCount++;
            tasksGroupedByDay[dayIndex].date = task.date; // Usamos la fecha de la tarea
        });
        return tasksGroupedByDay;
    }
}
exports.GetTasksByCompletionStatusUseCase = GetTasksByCompletionStatusUseCase;

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
exports.MongoTaskRepository = void 0;
const Task_1 = require("../../domain/Task");
const DatabaseConnection_1 = require("../../../database/DatabaseConnection");
const daysOfWeekInSpanish = [
    'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'
];
class MongoTaskRepository {
    constructor() {
        this.collection = (0, DatabaseConnection_1.getMongoDB)().collection('tasks');
    }
    // Método para guardar una nueva tarea
    save(task) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collection.insertOne({
                id: task.id,
                userUuid: task.userUuid,
                taskName: task.taskName,
                type: task.type,
                priority: task.priority,
                date: task.date,
                time: task.time,
                status: task.status,
            });
        });
    }
    // Método para obtener la línea de tiempo de tareas (fecha, nombre, prioridad, tipo, completada)
    getTaskTimeline() {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtener todas las tareas
            const tasks = yield this.collection.find().toArray();
            // Mapear los resultados de MongoDB a la estructura deseada
            return tasks.map(task => ({
                userUuid: task.userUuid,
                date: task.date,
                taskName: task.taskName,
                priority: task.priority,
                type: task.type,
                completed: task.status === 'terminada', // Consideramos que "terminada" indica tarea completada
            }));
        });
    }

    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.collection
                .find()
                .sort({ date: 1 }) // Ordenar de forma ascendente por la fecha (1 para ascendente, -1 para descendente)
                .toArray();
            return tasks.map(task => new Task_1.Task(task.id, task.userUuid, task.taskName, task.type, task.priority, task.date, task.time, task.status));
        });
    }
    // Método para obtener una tarea por ID
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.collection.findOne({ id });
            if (!doc)
                return null;
            return new Task_1.Task(doc.id, doc.userUuid, doc.taskName, doc.type, doc.priority, doc.date, doc.time, doc.status);
        });
    }
    // Método para actualizar el estado de una tarea
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collection.updateOne({ id }, { $set: { status } });
        });
    }
    // Método para obtener tareas por fecha
    getTasksByDate(userUuid, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.collection.find({ userUuid, date }).toArray();
            return tasks.map(task => new Task_1.Task(task.id, task.userUuid, task.taskName, task.type, task.priority, task.date, task.time, task.status));
        });
    }

    getTasksByCompletionStatus(userUuid, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            // Filtramos las tareas según el estado completado/no completado
            const tasks = yield this.collection.find({
                userUuid,
                status: completed ? 'terminada' : 'activa',
            }).toArray();
            // Devolvemos las tareas mapeadas al tipo Task
            return tasks.map((doc) => new Task_1.Task(doc.id, doc.userUuid, doc.taskName, doc.type, doc.priority, doc.date, doc.time, doc.status));
        });
    }
}
exports.MongoTaskRepository = MongoTaskRepository;


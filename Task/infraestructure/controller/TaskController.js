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
exports.TaskController = void 0;
const Task_1 = require("../../domain/Task");
const uuid_1 = require("uuid");
class TaskController {
    constructor(saveTaskUseCase) {
        this.saveTaskUseCase = saveTaskUseCase;
    }
    saveTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userUuid, taskName, type, priority, date, time } = req.body;
            if (!userUuid || !taskName || !type || !priority || !date || !time) {
                return res.status(400).json({ message: 'Faltan datos' });
            }
            try {
                const task = new Task_1.Task((0, uuid_1.v4)(), userUuid, taskName, type, priority, date, time);
                yield this.saveTaskUseCase.execute(task);
                return res.status(201).json({ message: 'Tarea guardada', task });
            }
            catch (error) {
                return res.status(500).json({ message: 'Error al guardar la tarea', error: error });
            }
        });
    }
    updateTaskStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status } = req.body;
            if (!id || !status || !['activa', 'terminada'].includes(status)) {
                return res.status(400).json({ message: 'Datos inválidos' });
            }
            try {
                yield this.saveTaskUseCase['taskRepository'].updateStatus(id, status);
                return res.status(200).json({ message: `Estado de la tarea actualizado a ${status}` });
            }
            catch (error) {
                return res.status(500).json({ message: 'Error al actualizar el estado de la tarea', error: error });
            }
        });
    }
}
exports.TaskController = TaskController;

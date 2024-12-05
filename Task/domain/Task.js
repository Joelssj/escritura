"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(id, userUuid, taskName, type, priority, date, time, status = 'activa' // Estado predeterminado: "activa"
    ) {
        this.id = id;
        this.userUuid = userUuid;
        this.taskName = taskName;
        this.type = type;
        this.priority = priority;
        this.date = date;
        this.time = time;
        this.status = status;
    }
}
exports.Task = Task;

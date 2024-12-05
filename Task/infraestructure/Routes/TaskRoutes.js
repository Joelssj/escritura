"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskController_1 = require("../controller/TaskController");
const GetTaskController_1 = require("../controller/GetTaskController");
const MongoTaskRepository_1 = require("../adapters/MongoTaskRepository");
const SaveTaskUseCase_1 = require("../../application/SaveTaskUseCase");
const GetTaskTimelineUseCase_1 = require("../../application/GetTaskTimelineUseCase");
const GetAllTasksUseCase_1 = require("../../application/GetAllTasksUseCase");
const GetAllTasksController_1 = require("../controller/GetAllTasksController");
const GetTasksByCompletionStatusUseCase_1 = require("../../application/GetTasksByCompletionStatusUseCase");
const GetTasksByCompletionStatusController_1 = require("../controller/GetTasksByCompletionStatusController");
const router = express_1.default.Router();
// Repositorio común
const taskRepository = new MongoTaskRepository_1.MongoTaskRepository();
// Casos de uso
const saveTaskUseCase = new SaveTaskUseCase_1.SaveTaskUseCase(taskRepository);
const getTaskTimelineUseCase = new GetTaskTimelineUseCase_1.GetTaskTimelineUseCase(taskRepository);
const getTasksByCompletionStatusUseCase = new GetTasksByCompletionStatusUseCase_1.GetTasksByCompletionStatusUseCase(taskRepository);
const getAllTasksUseCase = new GetAllTasksUseCase_1.GetAllTasksUseCase(taskRepository);
const getAllTasksController = new GetAllTasksController_1.GetAllTasksController(getAllTasksUseCase);
// Controladores
const taskController = new TaskController_1.TaskController(saveTaskUseCase);
const getTaskTimelineController = new GetTaskController_1.GetTaskTimelineController(getTaskTimelineUseCase);
const getTasksByCompletionStatusController = new GetTasksByCompletionStatusController_1.GetTasksByCompletionStatusController(getTasksByCompletionStatusUseCase);
// Rutas
router.post('/create', (req, res) => taskController.saveTask(req, res));
router.put('/update/:id', (req, res) => taskController.updateTaskStatus(req, res));
router.get('/get/grafica', (req, res) => getTaskTimelineController.handle(req, res));
router.get('/get', (req, res) => getAllTasksController.handle(req, res));
//router.get('/get/tareas', (req, res) => getTasksByCompletionStatusController.handle(req, res));
router.get('/get/tareas/:userUuid', (req, res) => getTasksByCompletionStatusController.handle(req, res));
exports.default = router;

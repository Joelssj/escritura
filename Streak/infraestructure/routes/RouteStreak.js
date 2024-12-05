"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MongoStreakRepository_1 = require("../adapter/MongoStreakRepository");
const MongoTaskRepository_1 = require("../../../Task/infraestructure/adapters/MongoTaskRepository");
const ManageStreakUseCase_1 = require("../../application/ManageStreakUseCase");
const StreakController_1 = require("../controller/StreakController");
const router = express_1.default.Router();
// Repositorios
const streakRepository = new MongoStreakRepository_1.MongoStreakRepository();
const taskRepository = new MongoTaskRepository_1.MongoTaskRepository();
// Casos de uso
const manageStreakUseCase = new ManageStreakUseCase_1.ManageStreakUseCase(streakRepository, taskRepository);
// Controladores
const streakController = new StreakController_1.StreakController(manageStreakUseCase);
// Rutas
router.get('/get/:userUuid', (req, res) => streakController.getStreak(req, res));
router.post('/procesar/:userUuid', (req, res) => streakController.processDay(req, res));
router.post('/:userUuid/reset', (req, res) => streakController.resetStreak(req, res));
exports.default = router;

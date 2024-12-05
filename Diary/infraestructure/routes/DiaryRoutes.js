"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DiaryController_1 = require("../controller/DiaryController");
const MongoDiaryRepository_1 = require("../adapter/MongoDiaryRepository");
const SaveDiaryUseCase_1 = require("../../application/SaveDiaryUseCase");
const MulterMiddleware_1 = require("../middleware/MulterMiddleware");
const GetAllDiariesUseCase_1 = require("../../application/GetAllDiariesUseCase");
const GetAllDiariesController_1 = require("../controller/GetAllDiariesController");
const router = express_1.default.Router();
const diaryRepository = new MongoDiaryRepository_1.MongoDiaryRepository();
const saveDiaryUseCase = new SaveDiaryUseCase_1.SaveDiaryUseCase(diaryRepository);
const diaryController = new DiaryController_1.DiaryController(saveDiaryUseCase);
const getAllDiariesUseCase = new GetAllDiariesUseCase_1.GetAllDiariesUseCase(diaryRepository);
const getAllDiariesController = new GetAllDiariesController_1.GetAllDiariesController(getAllDiariesUseCase);
// Ruta para guardar un diario
router.post('/create', MulterMiddleware_1.uploadSingleImage, (req, res) => diaryController.saveDiary(req, res));
router.get('/get', (req, res) => getAllDiariesController.handle(req, res));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signale_1 = require("signale");
const express_1 = __importDefault(require("express"));
const TaskRoutes_1 = __importDefault(require("./Task/infraestructure/Routes/TaskRoutes"));
const DiaryRoutes_1 = __importDefault(require("./Diary/infraestructure/routes/DiaryRoutes"));
const RouteStreak_1 = __importDefault(require("./Streak/infraestructure/routes/RouteStreak"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const signale = new signale_1.Signale();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/task", TaskRoutes_1.default);
app.use("/api/v1/diary", DiaryRoutes_1.default);
app.use("/api/v1/streak", RouteStreak_1.default);
const port = 3003;
const host = '0.0.0.0';
app.listen(port, host, () => {
    signale.success("Server online in port 3003");
});

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
exports.ManageStreakUseCase = void 0;
class ManageStreakUseCase {
    constructor(streakRepository, taskRepository) {
        this.streakRepository = streakRepository;
        this.taskRepository = taskRepository;
    }
    processDay(userUuid, date, useProtector) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[ManageStreakUseCase] Iniciando proceso para userUuid: ${userUuid}, date: ${date}, useProtector: ${useProtector}`);
            const streak = yield this.streakRepository.getStreakByUser(userUuid);
            if (!streak) {
                console.warn(`[ManageStreakUseCase] Racha no encontrada para userUuid: ${userUuid}`);
                throw new Error('Racha no encontrada');
            }
            console.log(`[ManageStreakUseCase] Racha encontrada:`, streak);
            const tasks = yield this.taskRepository.getTasksByDate(userUuid, date);
            console.log(`[ManageStreakUseCase] Tareas para la fecha ${date}:`, tasks);
            const allCompleted = tasks.every((task) => task.status === 'terminada');
            console.log(`[ManageStreakUseCase] Todas las tareas completadas: ${allCompleted}`);
            if (allCompleted) {
                streak.currentStreak += 1;
                if (streak.currentStreak > streak.maxStreak) {
                    streak.maxStreak = streak.currentStreak;
                }
                streak.days.push({ date, status: 'completed' });
                console.log(`[ManageStreakUseCase] Día completado para la racha.`);
            }
            else if (useProtector && streak.protectorsLeft > 0) {
                streak.protectorsLeft -= 1;
                streak.days.push({ date, status: 'protected' });
                console.log(`[ManageStreakUseCase] Día protegido.`);
            }
            else {
                streak.currentStreak = 0;
                streak.days.push({ date, status: 'failed' });
                console.log(`[ManageStreakUseCase] Día fallido, racha reiniciada.`);
            }
            yield this.streakRepository.saveStreak(streak);
            console.log(`[ManageStreakUseCase] Racha actualizada y guardada.`);
        });
    }
    resetStreak(userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.streakRepository.resetStreak(userUuid);
        });
    }
    getStreak(userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[ManageStreakUseCase] Buscando racha para userUuid: ${userUuid}`);
            const streak = yield this.streakRepository.getStreakByUser(userUuid);
            if (!streak) {
                console.warn(`[ManageStreakUseCase] No se encontró racha para userUuid: ${userUuid}`);
            }
            else {
                console.log(`[ManageStreakUseCase] Racha encontrada para userUuid: ${userUuid}`, streak);
            }
            return streak;
        });
    }
}
exports.ManageStreakUseCase = ManageStreakUseCase;

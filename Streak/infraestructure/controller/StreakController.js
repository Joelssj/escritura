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
exports.StreakController = void 0;
class StreakController {
    constructor(manageStreakUseCase) {
        this.manageStreakUseCase = manageStreakUseCase;
    }
    getStreak(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userUuid } = req.params;
            console.log(`[StreakController] Iniciando búsqueda de racha para userUuid: ${userUuid}`);
            if (!userUuid) {
                console.error(`[StreakController] userUuid no proporcionado`);
                return res.status(400).json({ message: 'Falta el identificador del usuario' });
            }
            try {
                const streak = yield this.manageStreakUseCase.getStreak(userUuid);
                if (!streak) {
                    console.warn(`[StreakController] Racha no encontrada para userUuid: ${userUuid}`);
                    return res.status(404).json({ message: 'Racha no encontrada' });
                }
                console.log(`[StreakController] Racha encontrada para userUuid: ${userUuid}`, streak);
                return res.status(200).json(streak);
            }
            catch (error) {
                console.error(`[StreakController] Error al obtener la racha para userUuid: ${userUuid}`, error);
                return res.status(500).json({ message: 'Error al obtener la racha', error: error });
            }
        });
    }
    processDay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userUuid } = req.params;
            const { date, useProtector } = req.body;
            console.log(`[StreakController] Procesando racha para userUuid: ${userUuid}, date: ${date}, useProtector: ${useProtector}`);
            if (!userUuid || !date) {
                console.error(`[StreakController] Faltan datos requeridos: userUuid o date`);
                return res.status(400).json({ message: 'Faltan datos requeridos: userUuid o date' });
            }
            try {
                yield this.manageStreakUseCase.processDay(userUuid, date, useProtector || false);
                console.log(`[StreakController] Racha procesada correctamente para userUuid: ${userUuid}, date: ${date}`);
                return res.status(200).json({ message: 'Racha procesada correctamente' });
            }
            catch (error) {
                console.error(`[StreakController] Error al procesar la racha para userUuid: ${userUuid}, date: ${date}`, error);
                return res.status(500).json({ message: 'Error al procesar la racha', error });
            }
        });
    }
    resetStreak(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userUuid } = req.params;
            if (!userUuid) {
                return res.status(400).json({ message: 'Falta el identificador del usuario' });
            }
            try {
                yield this.manageStreakUseCase.resetStreak(userUuid);
                return res.status(200).json({ message: 'Racha reiniciada correctamente' });
            }
            catch (error) {
                return res.status(500).json({ message: 'Error al reiniciar la racha', error: error });
            }
        });
    }
}
exports.StreakController = StreakController;

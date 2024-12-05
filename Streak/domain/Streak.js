"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Streak = void 0;
class Streak {
    constructor(userUuid, // Identificador único del usuario
    currentStreak, // Racha actual (modificable)
    maxStreak, // Máxima racha lograda (modificable)
    protectorsLeft, // Protectores restantes (modificable)
    days // Historial de días
    ) {
        this.userUuid = userUuid;
        this.currentStreak = currentStreak;
        this.maxStreak = maxStreak;
        this.protectorsLeft = protectorsLeft;
        this.days = days;
    }
}
exports.Streak = Streak;

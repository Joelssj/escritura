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
exports.MongoStreakRepository = void 0;
const Streak_1 = require("../../domain/Streak");
const DatabaseConnection_1 = require("../../../database/DatabaseConnection");
class MongoStreakRepository {
    constructor() {
        this.collection = (0, DatabaseConnection_1.getMongoDB)().collection('streaks');
    }
    getStreakByUser(userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[MongoStreakRepository] Buscando racha para userUuid: ${userUuid}`);
            const doc = yield this.collection.findOne({ userUuid });
            if (!doc) {
                console.warn(`[MongoStreakRepository] No se encontró racha para userUuid: ${userUuid}`);
                return null;
            }
            console.log(`[MongoStreakRepository] Racha encontrada:`, doc);
            return new Streak_1.Streak(doc.userUuid, doc.currentStreak, doc.maxStreak, doc.protectorsLeft, doc.days);
        });
    }
    saveStreak(streak) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collection.updateOne({ userUuid: streak.userUuid }, {
                $set: {
                    currentStreak: streak.currentStreak,
                    maxStreak: streak.maxStreak,
                    protectorsLeft: streak.protectorsLeft,
                    days: streak.days,
                },
            }, { upsert: true } // Crea el documento si no existe
            );
        });
    }
    resetStreak(userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collection.updateOne({ userUuid }, {
                $set: {
                    currentStreak: 0,
                    protectorsLeft: 2, // Reinicia protectores
                    days: [], // Limpia el historial
                },
            });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.collection
                .find({}, { projection: { userUuid: 1, _id: 0 } }) // Proyecta solo `userUuid` y excluye `_id`
                .toArray();
            // Asegúrate de mapear correctamente el resultado
            return users.map((doc) => ({ userUuid: doc.userUuid }));
        });
    }
}
exports.MongoStreakRepository = MongoStreakRepository;

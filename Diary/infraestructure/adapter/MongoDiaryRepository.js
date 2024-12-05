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
exports.MongoDiaryRepository = void 0;
const Diary_1 = require("../../domain/Diary");
const DatabaseConnection_1 = require("../../../database/DatabaseConnection");
class MongoDiaryRepository {
    constructor() {
        this.collection = (0, DatabaseConnection_1.getMongoDB)().collection('diaries');
    }
    save(diary) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collection.insertOne({
                id: diary.id,
                userUuid: diary.userUuid,
                image: diary.image,
                comment: diary.comment,
                date: diary.date,
                time: diary.time,
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const diaries = yield this.collection.find().toArray();
            return diaries.map((doc) => new Diary_1.Diary(doc.id, doc.userUuid, doc.image, doc.comment, doc.date, doc.time));
        });
    }
    getByUserUuid(userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const diaries = yield this.collection.find({ userUuid }).toArray();
            return diaries.map((doc) => new Diary_1.Diary(doc.id, doc.userUuid, doc.image, doc.comment, doc.date, doc.time));
        });
    }
}
exports.MongoDiaryRepository = MongoDiaryRepository;

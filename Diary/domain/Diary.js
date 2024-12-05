"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diary = void 0;
class Diary {
    constructor(id, userUuid, // Identifica al usuario al que pertenece
    image, // URL o base64 de la imagen
    comment, // Comentario asociado
    date, // Fecha del diario
    time // Hora del diario
    ) {
        this.id = id;
        this.userUuid = userUuid;
        this.image = image;
        this.comment = comment;
        this.date = date;
        this.time = time;
    }
}
exports.Diary = Diary;

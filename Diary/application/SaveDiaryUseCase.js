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
exports.SaveDiaryUseCase = void 0;
class SaveDiaryUseCase {
    constructor(diaryRepository) {
        this.diaryRepository = diaryRepository;
    }
    execute(diary) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Ejecutando el caso de uso para guardar el diario...");
            try {
                // Verificar si el diario tiene los datos requeridos
                if (!diary || !diary) {
                    console.log("❌ El diario está vacío o no tiene contenido.");
                    return;
                }
                // Llamada al repositorio para guardar el diario
                console.log("Guardando el diario en el repositorio...");
                yield this.diaryRepository.save(diary);
                // Mensaje de éxito
                console.log("✔️ Diario guardado exitosamente.");
            }
            catch (error) {
                // En caso de error, lo mostramos en consola
                console.log("❌ Error al guardar el diario:", error);
            }
        });
    }
}
exports.SaveDiaryUseCase = SaveDiaryUseCase;

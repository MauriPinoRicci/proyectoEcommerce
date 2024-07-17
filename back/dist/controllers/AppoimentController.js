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
exports.cancelAppoiment = exports.postAppoiments = exports.getAppoiment = exports.getAllAppoiment = void 0;
const getAllAppoiment = () => __awaiter(void 0, void 0, void 0, function* () {
    yield console.log("obtener todos los turnos de todos los usuarios");
});
exports.getAllAppoiment = getAllAppoiment;
const getAppoiment = () => __awaiter(void 0, void 0, void 0, function* () {
    yield console.log("obtener el detalle de un turno especifico");
});
exports.getAppoiment = getAppoiment;
const postAppoiments = () => __awaiter(void 0, void 0, void 0, function* () {
    yield console.log("agenda un nuevo turno");
});
exports.postAppoiments = postAppoiments;
const cancelAppoiment = () => __awaiter(void 0, void 0, void 0, function* () {
    yield console.log("Cambiar el estatus de un turno a cancelled");
});
exports.cancelAppoiment = cancelAppoiment;

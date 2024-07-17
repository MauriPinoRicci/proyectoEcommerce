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
exports.cancelShift = exports.postShift = exports.getShift = exports.getAllShift = void 0;
const getAllShift = () => __awaiter(void 0, void 0, void 0, function* () {
    yield console.log("obtener todos los turnos de todos los usuarios");
});
exports.getAllShift = getAllShift;
const getShift = () => __awaiter(void 0, void 0, void 0, function* () {
    yield console.log("obtener el detalle de un turno especifico");
});
exports.getShift = getShift;
const postShift = () => __awaiter(void 0, void 0, void 0, function* () {
    yield console.log("agenda un nuevo turno");
});
exports.postShift = postShift;
const cancelShift = () => __awaiter(void 0, void 0, void 0, function* () {
    yield console.log("Cambiar el estatus de un turno a cancelled");
});
exports.cancelShift = cancelShift;

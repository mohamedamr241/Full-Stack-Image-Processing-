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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageResize_1 = require("../Controller/imageResize");
const validation_1 = require("../Middleware/validation");
const path_1 = __importDefault(require("path"));
const checkBuffering_1 = require("../Middleware/checkBuffering");
const route = express_1.default.Router();
route.get('/image', validation_1.validate, checkBuffering_1.checkBuffer, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, imageResize_1.ImageProcessing)(req.query.filename, req.query.width, req.query.height);
    res.sendFile(path_1.default.resolve(result));
}));
exports.default = route;

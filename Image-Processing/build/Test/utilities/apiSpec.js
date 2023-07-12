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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const imageResize_1 = require("../../Controller/imageResize");
const path_1 = __importDefault(require("path"));
const request = (0, supertest_1.default)(server_1.default);
describe('testing endpoints', () => __awaiter(void 0, void 0, void 0, function* () {
    it('testing image endpoint which will respond', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = yield request.get('/main/image?filename=fjord&width=200&height=200');
        expect(req.status).toBe(200);
    }));
    it('testing image endpoint which will not respond', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = yield request.get('/main/image');
        expect(req.status).toBe(400);
    }));
}));
describe('Testing image processing', () => {
    it('testing imageResize controller', () => __awaiter(void 0, void 0, void 0, function* () {
        const Imagepath = yield (0, imageResize_1.ImageProcessing)('fjord', 200, 200);
        expect(path_1.default.resolve(Imagepath)).toEqual(path_1.default.resolve('./images/buffer/fjord-200-200.jpg'));
    }));
});

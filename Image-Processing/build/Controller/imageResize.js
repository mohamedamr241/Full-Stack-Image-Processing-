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
exports.ImageProcessing = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
function ImageProcessing(imageName, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        // ==> first creating the buffer directory if it does not exist
        let images = [];
        const files = fs_1.default.readdirSync('./images');
        files.forEach((img) => {
            const nameWithouExtension = path_1.default.parse(img).name;
            images.push(nameWithouExtension);
        });
        if (!images.includes('buffer')) {
            fs_1.default.mkdir('./images/buffer', (err) => {
                if (err) {
                    console.error('Error creating directory:', err);
                }
                else {
                    console.log('Directory created successfully.');
                }
            });
        }
        // pathes of source and destination
        const inputImagePath = `./images/${imageName}.jpg`;
        const outputImagePath = `./images/buffer/${imageName}-${width}-${height}.jpg`;
        yield (0, sharp_1.default)(inputImagePath)
            .resize(parseInt(width), parseInt(height))
            .toFile(outputImagePath);
        return outputImagePath;
    });
}
exports.ImageProcessing = ImageProcessing;
